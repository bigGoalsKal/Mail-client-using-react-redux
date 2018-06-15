import React from "react";
import { shallow } from "enzyme";
import ConnectedMail, { Mail } from "../components/Mail";
import configureStore from "redux-mock-store";
import { storeComposeMail } from "../actions/compose.js";
 
describe("Testing mail component with store store", () => {
    const initialState = {};
    const mockStore = configureStore();
    let store, container;

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<ConnectedMail store={store} />);
    });

    it("+++ render the connected(SMART) component", () => {
        expect(container.length).toEqual(1);
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
        store.dispatch(storeComposeMail(composedata));
        action = store.getActions();
        expect(action[0].type).toBe("STORE_COMPOSE_MAIL");
    });
});

describe("without store", () => {
    let wrapper;
    const mockLoginfn1 = jest.fn();
    test("submit click event", () => {
        const spy = jest.spyOn(Mail.prototype, "handleCompose");
        var data = {
            id: "",
            from: "",
            to: "",
            subject: "",
            time: "",
            body: ""
        };
        const wrapper = shallow(
            <Mail
                storeComposeMail={mockLoginfn1}
                folder="inbox"
                inboxData={data}
                mail={1}
            />
        );

        const Button = wrapper.find("NavLink").at(0);
        Button.simulate("click");
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("date convertion", () => {
        const mockLoginfn1 = jest.fn();
        const converttime = jest.fn();
        var data = {
            id: "",
            from: "",
            to: "",
            subject: "",
            time: "",
            body: ""
        };
        const wrapper = shallow(
            <Mail
                storeComposeMail={mockLoginfn1}
                folder="inbox"
                inboxData={data}
                mail={1}
            />
        );
        var time = "2018-02-24T18:25:43.511Z";
      //  expect(wrapper.instance().converttime(time)).toEqual({
        //    date: "2/24/2018",
          //  time: "11:55:43 PM"
       // });
       expect(wrapper.instance().converttime(time)).toEqual({"date": "2/24/2018", "time": "6:25:43 PM"} );

    });

    test("check enable edit button", () => {
        const mockLoginfn1 = jest.fn();
        var data = {
            id: "",
            from: "",
            to: "",
            subject: "",
            time: "",
            body: ""
        };
        const wrapper = shallow(
            <Mail
                storeComposeMail={mockLoginfn1}
                folder="draft"
                inboxData={data}
                mail={1}
            />
        );
        let editbutton = wrapper.find("button").at(0);
        expect(
            editbutton.hasClass("btn-success pull-right composebtn")
        ).toEqual(true);
        wrapper.setProps({ folder: "inbox" });
        editbutton = wrapper.find("button").at(0);
        expect(
            editbutton.hasClass("btn-success pull-right composebtn visible")
        ).toEqual(true);
    });

    test("check empty mails", () => {
        const mockLoginfn1 = jest.fn();
        var data = {
            id: "1",
            from: "someone@nowhere.com",
            to: "you@here.com",
            subject: "Hey",
            time: "2018-02-24T18:25:43.511Z",
            body: "whatsup?"
        };
        const wrapper = shallow(
            <Mail
                storeComposeMail={mockLoginfn1}
                folder="draft"
                inboxData={data}
                mail={0}
            />
        );
        let div = wrapper.find("div").at(0);
        expect(
            wrapper.containsMatchingElement(
                <strong>Select a mail to read.</strong>
            )
        ).toBeTruthy();
    });

    test("check mail strucure", () => {
        const mockLoginfn1 = jest.fn();
        var data = {
            id: "1",
            from: "someone@nowhere.com",
            to: "you@here.com",
            subject: "Hey",
            time: "2018-02-24T18:25:43.511Z",
            body: "whatsup?"
        };
        const wrapper = shallow(
            <Mail
                storeComposeMail={mockLoginfn1}
                folder="draft"
                inboxData={data}
                mail={1}
            />
        );
        let div = wrapper.find("div").at(0);
        expect(
            wrapper.containsMatchingElement(<span>someone@nowhere.com</span>)
        ).toBeTruthy();
        expect(wrapper.containsMatchingElement(<h3>Hey</h3>)).toBeTruthy();
        expect(
            wrapper.containsMatchingElement(<strong>2/24/2018</strong>)
        ).toBeTruthy();
        expect(wrapper.containsMatchingElement(<i>whatsup?</i>)).toBeTruthy();
    });
});