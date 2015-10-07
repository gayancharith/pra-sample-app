import { React, Dispatcher } from 'praxis';

export default class ExpenseForm extends React.Component {
	constructor(props) {
		super(props);
		console.log('form constructor callled');

		this.onStoreChange = () => {
            this.forceUpdate();
        };        
	}

	componentWillMount() {
        Dispatcher.subscribe('expenses', 'change', this.onStoreChange);
    }

    componentWillUnmount() {
        Dispatcher.unsubscribe('expenses', 'change', this.onStoreChange);
    }

	render() {
		console.log('hellll');
		console.log(this.props.expenses);
		var expenseAmount = 0;
		this.props.expenses.forEach(function(expense) {
            console.log('aaa');
            console.log(expense.text);
            expenseAmount += parseInt(expense.text);
        });
        
		return (
			<div>
				<h1>Total Income</h1>
				{expenseAmount}
			</div>
		);
	}
}