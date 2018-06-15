import React from "react";
import { shallow } from "enzyme";
import ConnectedCompose, { ComposeMail } from "../components/ComposeMail";
import configureStore from "redux-mock-store";
import { storeDraftMail, deleteDraftMail } from "../actions/draft.js";
import { storeSentMail } from "../actions/sentMail.js";
import draft from "../reducers/draft.js";

describe("Testing folder component with store store", () => {
    const initialState = {
        compose: {
            id: 1,
            from: "user@tcs.com",
            to: "",
            subject: "",
            time: "",
            to: ""
        }
    };
    const mockStore = configureStore();
    let store, container;

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<ConnectedCompose store={store} />);
    });

   
    it("+++ check Prop matches with initialState", () => {
        expect(container.prop("compose")).toEqual(initialState.compose);
    });

    it("+++ check action on dispatching ", () => {
        let action;
        var composedata = {
            id: "",
            from: "",
            to: "",
            subject: "",
            time: "",
            body: ""
        };
        store.dispatch(storeDraftMail(composedata));
        store.dispatch(deleteDraftMail(composedata));
        store.dispatch(storeSentMail(composedata));

        action = store.getActions();
        expect(action[0].type).toBe("STORE_DRAFT_MAIL");
        expect(action[1].type).toBe("DELETE_DRAFT_MAIL");
        expect(action[2].type).toBe("STORE_SENT_MAIL");
    });
});

describe("ComposeMail Component", () => {
    let wrapper;
    const mockLoginfn1 = jest.fn();
    const mockLoginfn2 = jest.fn();
    const mockLoginfn3 = jest.fn();

    beforeEach(() => {
        wrapper = shallow(
            <ComposeMail
                storeSentMail={mockLoginfn1}
                storeDraftMail={mockLoginfn2}
                deleteDraftMail={mockLoginfn3}
            />
        );
    });

    it("Number of input boxes", () => {
        expect(wrapper.find("input")).toHaveLength(2);
    });

    it("Checking Text area", () => {
        expect(wrapper.find("textarea")).toHaveLength(1);
    });

    it("click compose button", () => {
        const spy = jest.spyOn(ComposeMail.prototype, "submitValidation");
        const nextButton = wrapper.find("NavLink").at(1);
        nextButton.simulate("click");
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

describe("simulate click event on onSubmit", () => {
    let wrapper;
    const mockLoginfn1 = jest.fn();
    const mockLoginfn2 = jest.fn();
    const mockLoginfn3 = jest.fn();

    test("submit click event", () => {
        const spy = jest.spyOn(ComposeMail.prototype, "handleOnSave");
        const wrapper = shallow(
            <ComposeMail
                storeSentMail={mockLoginfn1}
                storeDraftMail={mockLoginfn2}
                deleteDraftMail={mockLoginfn3}
            />
        );

        const nextButton = wrapper.find("NavLink").at(2);
        nextButton.simulate("click");
        expect(spy).toHaveBeenCalledTimes(1);
    });
    test("submit check error message", () => {
        
        const wrapper = shallow(
            <ComposeMail
                storeSentMail={mockLoginfn1}
                storeDraftMail={mockLoginfn2}
                deleteDraftMail={mockLoginfn3}
            />
        );
        wrapper.setState({ error: false });
        const errorspan = wrapper.find("span").at(0);
        expect(errorspan.hasClass('invisible')).toEqual(true);
    });

    test("submit check valid state", () => {
         const submitValidation = jest.fn();
        const wrapper = shallow(
            <ComposeMail
                storeSentMail={mockLoginfn1}
                storeDraftMail={mockLoginfn2}
                deleteDraftMail={mockLoginfn3}
            />
        );
        wrapper.setState({ to: "" });
        wrapper.setState({ valid: true });
        wrapper.instance().submitValidation()
        expect(wrapper.state().valid).toEqual(false)
     
    });
    test("email validation", () => {
         const validateEmail = jest.fn();
         const wrapper = shallow(
            <ComposeMail
                storeSentMail={mockLoginfn1}
                storeDraftMail={mockLoginfn2}
                deleteDraftMail={mockLoginfn3}
            />
        );
        var email="karthi@"
        expect(wrapper.instance().validateEmail(email)).toEqual(false)
     
    });
});