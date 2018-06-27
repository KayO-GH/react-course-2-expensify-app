import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters }from "../fixtures/filters";

let setTextFilterSpy, sortByDateSpy, sortByAmountSpy, 
    setStartDateSpy, setEndDateSpy, wrapper;

beforeEach(() => {
    setTextFilterSpy = jest.fn();
    sortByDateSpy = jest.fn();
    sortByAmountSpy = jest.fn();
    setStartDateSpy = jest.fn();
    setEndDateSpy = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilterSpy}
            sortByDate={sortByDateSpy}
            sortByAmount={sortByAmountSpy}
            setStartDate={setStartDateSpy}
            setEndDate={setEndDateSpy}
        />
    );
});

test("should render ExpenseListFilters correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with alt data correctly", () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test("should handle text changes", () => {
    const value = "test string";
    wrapper.find("input").simulate("change", {
        target:{ value }
    });
    expect(setTextFilterSpy).toHaveBeenLastCalledWith(value);
});

test("should sort by date", () => {
    const value = "date";
    wrapper.find("select").simulate("change", {
        target:{ value }
    });
    expect(sortByDateSpy).toHaveBeenCalled();
});

test("should sort by amount", () => {
    const value = "amount";
    wrapper.find("select").simulate("change", {
        target:{ value }
    });
    expect(sortByAmountSpy).toHaveBeenCalled();
});

test("should handle date changes", () => {
    wrapper.find("DateRangePicker").prop("onDatesChange")({
        startDate: altFilters.startDate, 
        endDate: altFilters.endDate
    });
    expect(setStartDateSpy).toHaveBeenLastCalledWith(altFilters.startDate);
    expect(setEndDateSpy).toHaveBeenLastCalledWith(altFilters.endDate);
});

test("should handle date focus changes", () => {
    const calendarFocused = "startDate";//one of 3 values, null, startDate or endDate
    wrapper.find("DateRangePicker").prop("onFocusChange")(calendarFocused);
    expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
});