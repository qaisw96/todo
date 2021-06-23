import React, {useState} from 'react';


export const SettingContext = React.createContext();

const SettingsProvider = (props) => {
    const [displayCompletedItem, setDisplayCompletedItem] = useState(true)
    const [DisplayItems, setDisplayItems] = useState(3)
    const [sortItems, setSortItems] = useState('')

    const state = {
        displayCompletedItem,
        DisplayItems,
        sortItems,
        setDisplayCompletedItem,
        setDisplayItems,
        setSortItems
    } 

    return (
        <SettingContext.Provider value={state}>
            {props.children}
        </SettingContext.Provider>
    )

};

export default  SettingsProvider