import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let removeExpenseSpy, editExpenseSpy, history, wrapper;

beforeEach(() => {
    removeExpenseSpy = jest.fn();
    editExpenseSpy = jest.fn();
    history = {
        push: jest.fn()
    };
    wrapper = shallow(
        <EditExpensePage 
            removeExpense={removeExpenseSpy}
            editExpense={editExpenseSpy}
            history={history}
            expense={expenses[0]}
        />
    );
});

test("should render EditExpensePage correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should handle editExpense", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(editExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
});

test("should handle removeExpense", () => {
    wrapper.find("button").simulate("click");
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(removeExpenseSpy).toHaveBeenLastCalledWith({id: expenses[0].id});
});