import React, { useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';




export default function DarkmodeToggle() {
    
    const [isDarkMode, setDarkMode] = useState(false);

 
    useEffect(() => {
const savedDarkMode = localStorage.getItem("darkMode") === "true";
 
setDarkMode(savedDarkMode);
}, []);

useEffect(() => {
document.documentElement.classList.toggle("dark", isDarkMode);
 
// Aufräumen, falls die Komponente entfernt wird
return () => {
document.documentElement.classList.remove("dark");
};
}, [isDarkMode]);
    const toggleDarkMode = (checked: boolean) => {
        setDarkMode(checked);
        localStorage.setItem("darkMode", String(checked));
    };

    return (
        <div><div className="relative flex items-center"><div 
        style={{
                     
            transition: '0.2s background',
        }}
        >

        <DarkModeSwitch
        style={{ marginTop: '6px' }}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={20}
        /></div></div></div>
    )
}