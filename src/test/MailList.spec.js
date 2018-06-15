import React from "react";
import { shallow } from "enzyme";
import MailListCompose, { MailList } from "../components/MailList";
import configureStore from "redux-mock-store";
import { deleteApiData } from "../actions/inbox.js";
import { requestInboxData } from "../actions/inboxMail.js";
import {
	readSentMail,
	deleteSentMail,
	storeSentMail
} from "../actions/sentMail.js";
import {
	readDraftMail,
	deleteDraftMail,
	storeDraftMail,
	restoreDraftMail
} from "../actions/draft.js";
import {
	readDeleteMail,
	storeDeleteMail,
	restoreDeleteMail
} from "../actions/delete.js";

describe("Testing folder component with store store", () => {
	const initialState = {};
	const mockStore = configureStore();
	let store, container;

	beforeEach(() => {
		store = mockStore(initialState);
		container = shallow(<MailListCompose store={store} />);
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
		store.dispatch(requestInboxData(1));
		store.dispatch(readSentMail());
		store.dispatch(readDraftMail());
		store.dispatch(readDeleteMail());
		store.dispatch(storeDeleteMail(composedata));
		store.dispatch(restoreDeleteMail(1));
		store.dispatch(deleteDraftMail(1));
		store.dispatch(deleteSentMail(1));
		store.dispatch(deleteApiData(1));

		action = store.getActions();

		expect(action[0].type).toBe("REQUEST_INBOX_DATA");
		expect(action[1].type).toBe("READ_SENT_MAIL");
		expect(action[2].type).toBe("READ_DRAFT_MAIL");
		expect(action[3].type).toBe("READ_TRASH_MAIL");
		expect(action[4].type).toBe("STORE_TRASH_MAIL");
		expect(action[5].type).toBe("RESTORE_TRASH_MAIL");
		expect(action[6].type).toBe("DELETE_DRAFT_MAIL");
		expect(action[7].type).toBe("DELETE_SENT_MAIL");
		expect(action[8].type).toBe("DELETE_INBOX_MAIL");
	});
});

describe("without store", () => {
	const mockLoginfn1 = jest.fn();

	var dataprop = {
		data: [
			{
				id: 1,
				from: "someone@nowhere.com",
				to: "you@here.com",
				subject: "Hey",
				time: "2018-02-24T18:25:43.511Z",
				body: "whatsup?"
			},
			{
				id: 2,
				from: "sometwo@nowhere.com",
				to: "you@here.com",
				subject: "Hey Hey",
				time: "2018-02-23T18:25:43.511Z",
				body: "howdy?"
			}
		]
	};
	const wrapper = shallow(
		<MailList
			requestInboxData={mockLoginfn1}
			readSentMail={mockLoginfn1}
			readDraftMail={mockLoginfn1}
			readDeleteMail={mockLoginfn1}
			deleteApiData={mockLoginfn1}
			storeDeleteMail={mockLoginfn1}
			deleteSentMail={mockLoginfn1}
			deleteDraftMail={mockLoginfn1}
			restoreDeleteMail={mockLoginfn1}
			storeDraftMail={mockLoginfn1}
			restoreDraftMail={mockLoginfn1}
			storeSentMail={mockLoginfn1}
			display="inbox"
			data={dataprop}
			sent={dataprop}
			draft={dataprop}
			trash={dataprop}
			inboxData={dataprop}
		/>
	);

	test("testing the rendering structure", () => {
		expect(wrapper.containsMatchingElement(<h5>Hey</h5>)).toBeTruthy();
		expect(wrapper.containsMatchingElement(<h5>Hey Hey</h5>)).toBeTruthy();
	});

	test("testing delete button", () => {
		var deletebutton = wrapper.find("button").at(0);
		expect(deletebutton.hasClass("delete-button pull-right")).toEqual(true);
		wrapper.setProps({ display: "trash" });
		deletebutton = wrapper.find("button").at(0);
		expect(
			deletebutton.hasClass("delete-button pull-right restore")
		).toEqual(true);
	});

	test("testing pagination", () => {
		wrapper.setProps({ display: "inbox" });

		var dataprop = {
			data: [
				{
					id: 1,
					from: "someone@nowhere.com",
					to: "you@here.com",
					subject: "Hey",
					time: "2018-02-24T18:25:43.511Z",
					body: "whatsup?"
				},
				{
					id: 2,
					from: "sometwo@nowhere.com",
					to: "you@here.com",
					subject: "Hey Hey",
					time: "2018-02-23T18:25:43.511Z",
					body: "howdy?"
				},
				{
					id: 3,
					from: "sometwo@nowhere.com",
					to: "you@here.com",
					subject: "Hey Hey",
					time: "2018-02-23T18:25:43.511Z",
					body: "howdy?"
				},
				{
					id: 4,
					from: "sometwo@nowhere.com",
					to: "you@here.com",
					subject: "Hey Hey",
					time: "2018-02-23T18:25:43.511Z",
					body: "howdy?"
				},
				{
					id: 5,
					from: "sometwo@nowhere.com",
					to: "you@here.com",
					subject: "Hey Hey",
					time: "2018-02-23T18:25:43.511Z",
					body: "howdy?"
				},
				{
					id: 6,
					from: "sometwo@nowhere.com",
					to: "you@here.com",
					subject: "old",
					time: "2018-01-02T18:25:43.511Z",
					body: "howdy?"
				},
				{
					id: 7,
					from: "sometwo@nowhere.com",
					to: "you@here.com",
					subject: "search",
					time: "2018-02-23T18:25:43.511Z",
					body: "howdy?"
				}
			]
		};
		wrapper.setProps({ data: dataprop });
		expect(wrapper.find("a")).toHaveLength(6);
	});

	test("testing search", () => {
		wrapper.setProps({ display: "inbox" });
		wrapper.setState({ searchText: "search" });
		expect(wrapper.find("a")).toHaveLength(1);
	});

	test("testing sort", () => {
		wrapper.setState({ searchText: "" });
		wrapper.setState({ selectValue: "old" });
		expect(
			wrapper
				.find("a")
				.at(0)
				.text()
		).toEqual("sometwo@nowhere.comDeleteold1/2/2018");
		wrapper.setState({ selectValue: "latest" });
	});

	test("simulate delete button click", () => {
		const spy = jest.spyOn(MailList.prototype, "handleMailDelete");
		const wrapper = shallow(
			<MailList
				requestInboxData={mockLoginfn1}
				readSentMail={mockLoginfn1}
				readDraftMail={mockLoginfn1}
				readDeleteMail={mockLoginfn1}
				deleteApiData={mockLoginfn1}
				storeDeleteMail={mockLoginfn1}
				deleteSentMail={mockLoginfn1}
				deleteDraftMail={mockLoginfn1}
				restoreDeleteMail={mockLoginfn1}
				storeDraftMail={mockLoginfn1}
				restoreDraftMail={mockLoginfn1}
				storeSentMail={mockLoginfn1}
				display="inbox"
				data={dataprop}
				sent={dataprop}
				draft={dataprop}
				trash={dataprop}
				inboxData={dataprop}
			/>
		);
		const nextButton = wrapper.find("button").at(1);
		nextButton.simulate("click");
		expect(spy).toHaveBeenCalledTimes(1);
	});

	test("simulate search text change", () => {
		const spy = jest.spyOn(MailList.prototype, "handleOnChange");
		const wrapper = shallow(
			<MailList
				requestInboxData={mockLoginfn1}
				readSentMail={mockLoginfn1}
				readDraftMail={mockLoginfn1}
				readDeleteMail={mockLoginfn1}
				deleteApiData={mockLoginfn1}
				storeDeleteMail={mockLoginfn1}
				deleteSentMail={mockLoginfn1}
				deleteDraftMail={mockLoginfn1}
				restoreDeleteMail={mockLoginfn1}
				storeDraftMail={mockLoginfn1}
				restoreDraftMail={mockLoginfn1}
				storeSentMail={mockLoginfn1}
				display="inbox"
				data={dataprop}
				sent={dataprop}
				draft={dataprop}
				trash={dataprop}
				inboxData={dataprop}
			/>
		);
		wrapper
			.find("input")
			.simulate("change", { target: { value: "hello" } });
		expect(spy).toHaveBeenCalledTimes(1);
	});

	test("simulate dropdown change", () => {
		const spy = jest.spyOn(MailList.prototype, "handleDropdownChange");
		const spy2 = jest.spyOn(MailList.prototype, "handleNextPage");
		const wrapper = shallow(
			<MailList
				requestInboxData={mockLoginfn1}
				readSentMail={mockLoginfn1}
				readDraftMail={mockLoginfn1}
				readDeleteMail={mockLoginfn1}
				deleteApiData={mockLoginfn1}
				storeDeleteMail={mockLoginfn1}
				deleteSentMail={mockLoginfn1}
				deleteDraftMail={mockLoginfn1}
				restoreDeleteMail={mockLoginfn1}
				storeDraftMail={mockLoginfn1}
				restoreDraftMail={mockLoginfn1}
				storeSentMail={mockLoginfn1}
				display="inbox"
				data={dataprop}
				sent={dataprop}
				draft={dataprop}
				trash={dataprop}
				inboxData={dataprop}
			/>
		);
		wrapper.find("select").simulate("change", { target: { value: "old" } });
		expect(spy).toHaveBeenCalledTimes(1);
	});

	test("simulate next button", () => {
		const spy = jest.spyOn(MailList.prototype, "handleNextPage");
		const wrapper = shallow(
			<MailList
				requestInboxData={mockLoginfn1}
				readSentMail={mockLoginfn1}
				readDraftMail={mockLoginfn1}
				readDeleteMail={mockLoginfn1}
				deleteApiData={mockLoginfn1}
				storeDeleteMail={mockLoginfn1}
				deleteSentMail={mockLoginfn1}
				deleteDraftMail={mockLoginfn1}
				restoreDeleteMail={mockLoginfn1}
				storeDraftMail={mockLoginfn1}
				restoreDraftMail={mockLoginfn1}
				storeSentMail={mockLoginfn1}
				display="inbox"
				data={dataprop}
				sent={dataprop}
				draft={dataprop}
				trash={dataprop}
				inboxData={dataprop}
			/>
		);

		const nextButton = wrapper.find("button").last();
		nextButton.simulate("click");
		expect(spy).toHaveBeenCalledTimes(1);
	});

	test("simulate prev button", () => {
		const spy = jest.spyOn(MailList.prototype, "handlePrePage");
		const wrapper = shallow(
			<MailList
				requestInboxData={mockLoginfn1}
				readSentMail={mockLoginfn1}
				readDraftMail={mockLoginfn1}
				readDeleteMail={mockLoginfn1}
				deleteApiData={mockLoginfn1}
				storeDeleteMail={mockLoginfn1}
				deleteSentMail={mockLoginfn1}
				deleteDraftMail={mockLoginfn1}
				restoreDeleteMail={mockLoginfn1}
				storeDraftMail={mockLoginfn1}
				restoreDraftMail={mockLoginfn1}
				storeSentMail={mockLoginfn1}
				display="inbox"
				data={dataprop}
				sent={dataprop}
				draft={dataprop}
				trash={dataprop}
				inboxData={dataprop}
			/>
		);
		const nextButton = wrapper.find(".previous");
		nextButton.simulate("click");
		expect(spy).toHaveBeenCalledTimes(1);
	});

	test("active mail state check ", () => {
		const handleMailClick = jest.fn();
		wrapper.instance().handleMailClick(3);
		expect(wrapper.state().activeMail).toEqual(3);
	});

	test("time convertion check ", () => {
		const converttime = jest.fn();
		var date = wrapper.instance().converttime("2018-02-22T18:25:43.511Z");
		expect(date).toEqual({ date: "2/22/2018", time: "11:55:43 PM" });
		//expect(date).toEqual({"date": "2/22/2018", "time": "6:25:43 PM"});
	});
});