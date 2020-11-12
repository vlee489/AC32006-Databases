// Essentially a basic Next.js Calculator, I created using mathjs although the code is almost entirely from a tutorial video by Youtuber Brice Ayres, I just use next.js instead of create-react-app essentially. He didn't include a license with his code so he reserves the right for this to be taken down at any time. Please check out his Youtube video though, it's a really great tutorial.

// His Github repository: https://github.com/MyNameIsURL/react-calculator-app
// His Youtube video: https://www.youtube.com/watch?v=KzYUuTiHdiY

import React, { Component } from "react";
import { evaluate } from "mathjs";
import Header from '../components/Header';
import Button from '../components/Button';
import Input from "../components/Input";


class Calculator extends Component {
	constructor(props) {
		super(props);
		this.state = { input: "" };
		this.errorMessage = "Could not compute ☹";
	}

	concatInput = val => {
		if (this.state.input === this.errorMessage) return this.setState({ input: val });
		this.setState({ input: `${this.state.input}${val}` })
	}

	clearInput = () => this.setState({ input: "" })

	evaluateInput = () => {
		try { this.setState({ input: evaluate(this.state.input) }); }
		catch { this.setState({ input: this.errorMessage }) }
	}

	render() {
		return (
			<div>
				<Header />
				<div className="container">
					<div className="calculator">
						<Input input={this.state.input}/>
						<div className="row">
							<Button onClickButton={this.concatInput}>7</Button>
							<Button onClickButton={this.concatInput}>8</Button>
							<Button onClickButton={this.concatInput}>9</Button>
							<Button onClickButton={this.concatInput}>/</Button>
						</div>
						<div className="row">
							<Button onClickButton={this.concatInput}>4</Button>
							<Button onClickButton={this.concatInput}>5</Button>
							<Button onClickButton={this.concatInput}>6</Button>
							<Button onClickButton={this.concatInput}>*</Button>
						</div>
						<div className="row">
							<Button onClickButton={this.concatInput}>1</Button>
							<Button onClickButton={this.concatInput}>2</Button>
							<Button onClickButton={this.concatInput}>3</Button>
							<Button onClickButton={this.concatInput}>+</Button>
						</div>
						<div className="row">
							<Button onClickButton={this.concatInput}>.</Button>
							<Button onClickButton={this.concatInput}>0</Button>
							<Button onClickButton={this.evaluateInput}>=</Button>
							<Button onClickButton={this.concatInput}>-</Button>
						</div>
						<div className="row">
							<Button onClickButton={this.clearInput}>Clear</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Calculator