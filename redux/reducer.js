let initialState = { contacts: [] };

export default contacts = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "GET_FILTERED": {
      const { contacts } = state;
      const filteredContacts = contacts.filter(
        (c) => c[`${action.payload.key}`] === action.payload.value
      );
      console.log(filteredContacts);
      return { ...state, filteredContacts: filteredContacts };
    }
    default:
      return state;
  }
};
