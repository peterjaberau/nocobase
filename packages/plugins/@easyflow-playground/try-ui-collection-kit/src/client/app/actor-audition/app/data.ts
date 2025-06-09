
export const storiesData = [
  {
    id: 'story-patchActor',
    name: 'patchActor',
    describe: 'When actor is not an ActorRef',
    info: 'should throw',
  },
  {
    id: 'story-noInspector',
    name: 'noInspector',
    describe: 'when no inspector provided',
    info: 'should not add an inspector to the actor',
  },
  {
    id: 'story-noInspector',
    name: 'noInspector',
    describe: 'when no inspector provided',
    info: 'should not add an inspector to the actor',
  },
  {
    id: 'story-customInspector',
    name: 'customInspector',
    describe: 'when a custom inspector is provided',
    info: 'should add a custom inspector to the actor',
  },
  {
    id: 'story-isNotRootActor',
    name: 'isNotRootActor',
    describe: 'when the actor is not a root actor',
    info: 'This machine immediately spawns a child actor when started',
  },
  {
    id: 'story-isRootActor',
    name: 'isRootActor',
    describe: 'when the actor is a root actor',
    info: 'should overwrite the original logger and system logger',
  },
  {
    id: 'story-unpatchActor-prev',
    name: 'unpatchActor-prev',
    describe: 'when actor was previously patched',
    info: 'when patched once, should restore the original logger. when patched multiple times, should inherit parent logger',
  },
  {
    id: 'story-unpatchActor-noprev',
    name: 'unpatchActor-noprev',
    describe: 'when actor was not previously patched',
    info: 'should not mutate the actor',
  },

  {
    id: 'story-createActorFromLogicOptions',
    name: 'createActorFromLogicOptions',
    describe: 'when called with logic and options',
    info: 'should create an actor with the provided logic and options',
  },

  {
    id: 'story-createActorFromLogicOnly',
    name: 'createActorFromLogicOnly',
    describe: 'when called with only logic',
    info: 'should return a curried function that accepts options',
  },

  {
    id: 'story-createActorNoArgs',
    name: 'createActorNoArgs',
    describe: 'when called with no arguments',
    info: 'should return itself',
  },

  {
    id: 'story-createActorWithLogicOptions',
    name: 'createActorWithLogicOptions',
    describe: 'when called with logic and options',
    info: 'should create an actor with the provided logic and options',
  },

  {
    id: 'story-createActorWithOptionsOnly',
    name: 'createActorWithOptionsOnly',
    describe: 'when called with only options',
    info: 'should return a curried function that accepts logic',
  },

  {
    id: 'story-createActorWithNoArgs',
    name: 'createActorWithNoArgs',
    describe: 'when called with no arguments',
    info: 'should return itself',
  },

  {
    id: 'story-onDone',
    name: 'onDone',
    describe: 'logic completed successfully',
    info: 'should output with the expected value',
  },

  {
    id: 'story-onDone-timeout',
    name: 'onDone-Timeout',
    describe: 'logic aborted due to timeout',
    info: 'should abort when provided a too-short timeout',
  },


  {
    id: 'story-emittedMachine',
    name: 'emitterMachine',
    describe: 'when called with an emitter machine',
    info: 'should emit two events',
  },

  {
    id: 'story-snapshotLogic',
    name: 'snapshotLogic',
    describe: 'when called with a snapshot logic',
    info: 'should contain word "bar" in state "second"',
  },


  {
    id: 'story-spawnerMachine',
    name: 'spawnerMachine',
    describe: 'spawner Machine on "SPAWN" event',
    info: 'should spawn a child with ID "noopPromise" when "SPAWN" event received',
  },


  {
    id: 'story-transitionMachine',
    name: 'transitionMachine',
    describe: 'transitionMachine 1-2',
    info: 'should transition from "first" to "second"',
  },

  {
    id: 'story-transitionMachine-1-3',
    name: 'transitionMachine-1-3',
    describe: 'transitionMachine 1-3',
    info: 'should not transition from "first" to "third"',
  }
]
