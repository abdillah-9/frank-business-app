import { useState } from "react";

export default function useToggleActions(){
    const [showActions, setShowActions]= useState(true);
    return {showActions, setShowActions}
}