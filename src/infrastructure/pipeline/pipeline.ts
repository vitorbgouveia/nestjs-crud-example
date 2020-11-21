export type Pipe = (stg) => void;

export class Pipeline {
  private pipes: Pipe[];

  constructor(pipes: Pipe[] = []) {
    this.pipes = pipes;
  }

  addPipe(pipe: Pipe): Pipeline {
    this.pipes.push(pipe);
    return this;
  }

  processPipe(args?): void {
    if (this.pipes.length === 0) { return args; }

    let stageOutput = args;

    this.pipes.forEach(stage => {
      stageOutput && typeof stage === 'function' ?
        stageOutput = stage(stageOutput) :
        stageOutput = stage;
    });

    return stageOutput;
  }
}
