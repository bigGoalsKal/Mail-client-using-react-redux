import trash from "../reducers/trash";

describe("sent reducers", () => {
	let initialState = {};
	initialState.id = 3001;
	initialState.data = [
		{
			id: 3000,
			from: "user@tcs.com",
			to: "ievolve@tcs.com",
			subject: "Trash mail",
			folder: "sent",
			folderId: "2",
			time: "2018-01-23T18:25",
			body: "you can restore this"
		}
	];

	it("returns proper initial state", () => {
		expect(trash(undefined, {})).toEqual({});
	});

	it("READ_TRASH_MAIL", () => {
		expect(
			trash(initialState, {
				type: "READ_TRASH_MAIL"
			})
		).toEqual(initialState);
	});

	it("STORE_TRASH_MAIL", () => {
		var payload = {
			id: 1,
			from: "user@tcs.com",
			to: "ievolve@tcs.com",
			subject: "some mail",
			time: "",
			body: "Hi to u",
			folder: "sent"
		};
		expect(
			trash(initialState, {
				type: "STORE_TRASH_MAIL",
				payload: payload
			})
		).toEqual({
			data: [
				{
					body: "you can restore this",
					folder: "sent",
					folderId: "2",
					from: "user@tcs.com",
					id: 3000,
					subject: "Trash mail",
					time: "2018-01-23T18:25",
					to: "ievolve@tcs.com"
				},
				{
					body: "Hi to u",
					folder: "sent",
					from: "user@tcs.com",
					id: 3001,
					subject: "some mail",
					time: "",
					to: "ievolve@tcs.com"
				}
			],
			id: 3002
		});
	});

	it("RESTORE_TRASH_MAIL", () => {
		expect(
			trash(initialState, {
				type: "RESTORE_TRASH_MAIL",
				payload: 3001
			})
		).toEqual({
			data: [
				{
					body: "you can restore this",
					folder: "sent",
					folderId: "2",
					from: "user@tcs.com",
					id: 3000,
					subject: "Trash mail",
					time: "2018-01-23T18:25",
					to: "ievolve@tcs.com"
				}
			],
			id: 3002
		});
	});
});