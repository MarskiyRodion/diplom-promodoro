import React from "react";

interface IDropdownContext {
    isPomidors?: number;
    setIsPomidors?: any; 
}

const DropdownContext = React.createContext<IDropdownContext>({})

export default DropdownContext