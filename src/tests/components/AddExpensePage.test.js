import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses";

let addExpenseSpy, history, wrapper;

beforeEach(() => {
    addExpenseSpy = jest.fn();
    history = { 
        push: jest.fn() 
    };
    //onSubmit and history should normally be passedin by the HOC of the same name AddExpensePage
    wrapper = shallow(<AddExpensePage addExpense={addExpenseSpy} history={history}/>);
});

test("should render AddExpensePage correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0]);
    expect(addExpenseSpy).toHaveBeenLastCalledWith(expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith("/");
});