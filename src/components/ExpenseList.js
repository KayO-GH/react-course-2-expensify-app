import React from "react";
import {connect} from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No Expenses</p>
            ):(
                props.expenses.map(
                    (expense) => {
                        return <ExpenseListItem {...expense} key={expense.id}/>;
                    }
                )
            )
        }
        
    </div>
);

const mapStateToProps = (state) => { //passed in store's state
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

// connect returns a HOC and we pass in ExpenseList as a wrapped component to the
// returned HOC
export default connect(mapStateToProps)(ExpenseList);