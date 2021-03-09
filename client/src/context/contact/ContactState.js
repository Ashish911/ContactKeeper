import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'asd',
                email: 'asd@ads.com',
                phone: '1231',
                type: 'personal'
            },
            {
                id: 2,
                name: 'adsd',
                email: 'adsd@ads.com',
                phone: '12231',
                type: 'professional'
            }
        ]
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add Contact


    // Delete Contact

    // Set Current Contact

    // Clear Current Contact

    // Update Contact

    // Filter Contacts

    // Clear Filter

    return (
        <ContactContext.Provider 
        value={{
            contacts: state.contacts
        }}>
            { props.children }
        </ContactContext.Provider>
    )
}

export default ContactState;