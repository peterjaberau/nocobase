import React, { useState, useEffect } from 'react';
import NodeGraphNew from './NodeGraph/NodeGraph';
import { getNodesAndEdges as getNodesAndEdgesForService } from '../utils/node-graphs/services-node-graph';
import {
  getNodesAndEdgesForCommands,
  getNodesAndEdgesForEvents,
  getNodesAndEdgesForQueries,
} from '../utils/node-graphs/message-node-graph';
import {
  getNodesAndEdges as getNodesAndEdgesForDomain,
  getNodesAndEdgesForDomainContextMap,
} from '../utils/node-graphs/domains-node-graph';
import { getNodesAndEdges as getNodesAndEdgesForFlows } from '../utils/node-graphs/flows-node-graph';
import { getVersionFromCollection } from '../utils/versions';
import { pageDataLoader } from '../utils/page-data-loader';
import { EventCatalog } from './event.catalog.component';
interface Props {
  id: string;
  collection: string;
  title?: string;
  version: string;
  mode: 'full' | 'simple';
  linkTo?: 'docs' | 'visualiser';
  href: {
    label: string;
    url: string;
  };
  linksToVisualiser?: boolean;
}

export const EventCatalogVisualiser = ({
  id,
  collection,
  title,
  version,
  mode = 'simple',
  linkTo = 'docs',
  href,
  linksToVisualiser,
}: any) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [links, setLinks] = useState<{ label: string; url: string; selected?: boolean }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const getNodesAndEdgesFunctions: any = {
        services: getNodesAndEdgesForService,
        events: getNodesAndEdgesForEvents,
        commands: getNodesAndEdgesForCommands,
        queries: getNodesAndEdgesForQueries,
        domains: getNodesAndEdgesForDomain,
        flows: getNodesAndEdgesForFlows,
      };

      if (collection in getNodesAndEdgesFunctions) {
        const { nodes: fetchedNodes, edges: fetchedEdges } = await getNodesAndEdgesFunctions[
          collection as keyof typeof getNodesAndEdgesFunctions
        ]({
          id,
          version,
          mode,
        });

        setNodes(fetchedNodes);
        setEdges(fetchedEdges);

        if (mode === 'full') {
          try {
            const allItems = await pageDataLoader[collection as keyof typeof pageDataLoader]();
            const versions = getVersionFromCollection(allItems, id, version);

            const item = versions[0];
            const listOfVersions = [...(item.data.versions || [])].sort((a, b) => b.localeCompare(a));

            if (listOfVersions.length > 1) {
              setLinks(
                listOfVersions.map((ver) => ({
                  label: `${item.data.name} v${ver}`,
                  url: `/visualiser/${collection}/${id}/${ver}`,
                  selected: ver === version,
                })),
              );
            }
          } catch (err) {
            setLinks([]);
          }
        }
      }

      if (collection === 'domain-context-map') {
        const { nodes: fetchedNodes, edges: fetchedEdges } = await getNodesAndEdgesForDomainContextMap({});
        setNodes(fetchedNodes);
        setEdges(fetchedEdges);
      }
    };

    fetchData();
  }, [id, collection, version, mode]);
  return (
    <div>
      <NodeGraphNew
        id={id}
        nodes={nodes}
        edges={edges}
        title={title}
        hrefLabel={href.label}
        href={href.url}
        linkTo={linkTo}
        linksToVisualiser={linksToVisualiser}
        links={links}
      />
      <style>
        {`
          .react-flow__attribution {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

