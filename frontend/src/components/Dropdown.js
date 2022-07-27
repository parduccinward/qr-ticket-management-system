import {React, useState} from 'react'
import "./Dropdown.css";
import * as BsIcons from 'react-icons/bs';

const Dropdown = ({title,selected,setSelected}) => {
    const [isActive, setIsActive] = useState(false);
    const options = ["Masculino", "Femenino", "No binario", "Transgénero", "Intersexual", "Prefiero no decirlo"];
  return (
      <div className="dropdown">
          <div className="dropdown-btn" onClick={e => setIsActive(!isActive)}>
              {!isActive ? (selected || title):title}
              <BsIcons.BsCaretDown/>
          </div>
          {isActive && (
            <div className="dropdown-content">
                {options.map(option => (
                    <div onClick={ e=> {setSelected(option);setIsActive(false)}} className="dropdown-item">
                        {option}
                    </div>
                ))}
            </div>
          )}
      </div>
  )
}

export default Dropdown