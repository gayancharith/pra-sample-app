import { React, Dispatcher } from 'praxis';

export default class ExpenseForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {amount: ''};
		console.log('form constructor callled');

		this.onSubmit = () => {
			this.handleExpenseFormSubmit();
		}

		this.onChange = (value) => {
			let amount = this.refs.amount.getDOMNode().value;
            this.setState({ amount: amount });
        };
	}

	render() {
		console.log(this.state.amount);
		return (
			<form id="expenseForm" ref="expenseForm"> 				
				<input value={this.state.amount} onChange={this.onChange} ref="amount" type="text" placeholder="Amount" /><br />
				<input ref="desc" type="text" placeholder="Add Description" /><br />
				<input ref="submit" value="Submit" type="submit" onClick={this.onSubmit} />
				<button ref="close" onClick={this.props.onClose}>Close</button>						
			</form>
		);
	}

	handleExpenseFormSubmit() {
		let amount = parseInt(this.state.amount);
		this.state.amount = '';
		console.log('before submit ' + amount);

		console.log(this.props.formType);
		if (this.props.formType === 'income') {
			amount = amount;
		} else if (this.props.formType === 'expense') {
			amount = -Math.abs(amount);
		}

		Dispatcher.dispatch({ action: 'createExpense', data: { text: amount } });
		this.refs.amount.getDOMNode().value = '';
		this.refs.desc.getDOMNode().value = '';
	}
}