import React from "react";
import { useSelector } from "@xstate/react";
import type { ActorRefFrom, SnapshotFrom } from "xstate";
import * as FormActor from "../actors/form";
import * as InputTextActor from "../actors/input-text";
import { Input } from "@chakra-ui/react"

const InputText = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

const InputTextSharedMachine = ({
  send,
  snapshot,
}: {
  snapshot: SnapshotFrom<typeof FormActor.actorWithValue>;
  send: ActorRefFrom<typeof FormActor.actorWithValue>["send"];
}) => {
  return (
    <Input
      type="text"
      value={snapshot.context.text}
      onChange={(e) => send({ type: "change", value: e.target.value })}
    />
  );
};

const InputTextSendTo = ({
  actor,
}: {
  actor: ActorRefFrom<typeof InputTextActor.actorSendTo>;
}) => {
  const value = useSelector(actor, (snapshot) => snapshot.context.value);
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => actor.send({ type: "change", value: e.target.value })}
    />
  );
};

const InputTextWithActor = ({
  name,
  actor,
}: {
  name: string;
  actor: ActorRefFrom<typeof InputTextActor.actorIndependent>;
}) => {
  const value = useSelector(actor, (snapshot) => snapshot.context.value);
  return (
    <Input
      type="text"
      name={name}
      value={value}
      onChange={(e) => actor.send({ type: "change", value: e.target.value })}
    />
  );
};

const InputTextInvoke = ({
  name,
  actor,
}: {
  name: string;
  actor: ActorRefFrom<typeof InputTextActor.actorIndependent>;
}) => {
  const value = useSelector(actor, (snapshot) => snapshot.context.value);
  return (
    <Input
      type="text"
      name={name}
      value={value}
      onChange={(e) => actor.send({ type: "change", value: e.target.value })}
    />
  );
};

const InputTextSendParent = ({
  actor,
}: {
  actor: ActorRefFrom<typeof InputTextActor.actorSendParent>;
}) => {
  const value = useSelector(actor, (snapshot) => snapshot.context.value);
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => actor.send({ type: "change", value: e.target.value })}
    />
  );
};

export {
  InputText,
  InputTextInvoke,
  InputTextSendParent,
  InputTextSendTo,
  InputTextSharedMachine,
  InputTextWithActor,
};
