import React from "react";
import { handleStringChange } from "./helpers";
import { JobViewer } from "./JobViewer";
import { CutJob, CutJobResults } from "./model";
import { convertCsvToJob, determineCutOrderForJob } from "./PanelOperations";

interface AppProps {}
interface AppState {
  inputText: string;

  job: CutJob | undefined;
  results: CutJobResults | undefined;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = { inputText: "", job: undefined, results: undefined };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps: AppProps, prevState: AppState) {}

  render() {
    return (
      <div>
        <p>App</p>

        <div>
          <textarea
            value={this.state.inputText}
            onChange={handleStringChange((inputText) =>
              this.setState({ inputText })
            )}
          />

          <button onClick={() => this.handleProcessClick()}>process !</button>
        </div>
        <div>
          <h1>job</h1>
          <JobViewer job={this.state.job} result={this.state.results} />
        </div>
      </div>
    );
  }
  handleProcessClick(): void {
    // get the input and send to job creation

    const newJob = convertCsvToJob(this.state.inputText);

    console.log("job start", newJob);

    const results = determineCutOrderForJob(newJob);

    console.log("result", results);

    this.setState({ job: newJob, results });
  }
}