import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";


export const LoadingShow = ()=>{
    const { loading } = useContext(GlobalContext);
    return (loading && <div className="loader"></div>);
};