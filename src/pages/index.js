import { Select } from '@windmill/react-ui';
import { default as MySelect } from "react-select";
import { useState, useRef } from 'react';
import {addDataToFirestore, getDataFromFirestore} from '../firebase'

export default function TechnicalTest() {
  // creating source values for the multi select form
  const source = [
    { value: "Source 1", label: "Source 1" },
    { value: "Source 2", label: "Source 2" },
    { value: "Source 3", label: "Source 3" },
    { value: "Source 4", label: "Source 4" }
  ];
  // providing custom styles for multi select form
  const customStyles = {
    container: (provided) => ({
      ...provided,
      maxWidth: "1000px",
      width: "100%"
    })
  };
  // creating references for the inputs and form
  const name = useRef()
  const access = useRef()
  const purpose = useRef()
  const mode = useRef()
  const refference = useRef()
  const limit = useRef()
  const contextSize = useRef()
  // the handler which save the completed form to a the "user-form" document in firestore and get the entire coletion "user-form" as a hashmap
  const handleSubmit = async (e) => {
    e.preventDefault()
    // checking the minimum requirements are followed
    if(name.current.value.length < 6){
      alert("Minimum 6 characters need on Name input")
    } else {
          await addDataToFirestore({
            name: name.current.value,
            access: access.current.value,
            purpose: purpose.current.value,
            mode: mode.current.value,
            refference: refference.current.value,
            limit: limit.current.value,
            contextSize: contextSize.current.value,
            sources: selectedOptions,
          });
          await getDataFromFirestore();  
    }
  };
  // we are tracking the value of the multi select form in a different way, with an useState hook
  const [selectedOptions, setSelectedOptions] = useState([source[0].value, source[1].value]);
  function handleSelectChange(selectedOptions) {
    const options = selectedOptions.map((option) => option.value)
    setSelectedOptions(options);
    
  }
  // the main ui part
  return (
    <div className='flex items-center justify-center w-full h-full pb-10 '>  
      <div className="bg-white shadow-lg  mb-20 min-h-[580px] mt-20 w-[460px] " >
        <div className="flex items-center p-2 pl-6 pr-6 justify-between border-b border-gray-300  w-full ">
          <div className=" text-base">General</div>
          <button className="bg-blue-700 w-[90px] hover:bg-blue-400 text-sm mt-1 text-white px-4 py-2 rounded " onClick={handleSubmit}>
            Save
          </button>
        </div>
        <div  className="mt-6 pl-6 pr-6 space-y-4" >
          <div>
            <label className="block text-sm mb-4">
              Name
            </label>
            
            <input
              className="appearance-none h-12 rounded border w-full py-2 px-3 text-gray-700 text-base leading-tight focus:border-2 focus:border-blue-500 focus:shadow-outline focus:ring-blue-500 outline-none"
              id="name"
              type="text"
              ref={name}
              required={true}
              minLength="6"
              placeholder="Active input text"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-4" >
                Access
              </label>
              <Select
                className="border rounded h-12 w-full text-base py-2 px-3 text-gray-400 leading-tight focus:border-2 focus:shadow-outline focus:border-blue-500 outline-none focus:ring-blue-500"
                id="access"
                ref={access}
                defaultValue='Private'
              >
                <option value="Private">Private</option>
                <option value="Public">Public</option>
                <option value="Administrator">Administrator</option>
              </Select>
            </div>
              <div>
                <label className="block text-sm mb-4">
                  Purpose
                </label>
                <Select
                  className="border rounded h-12 w-full text-base py-2 px-3 text-gray-400 leading-tight focus:border-2 focus:shadow-outline focus:border-blue-500 outline-none focus:ring-blue-500"
                  id="purpose"
                  ref={purpose}
                  defaultValue="Support agent"
                >
                  <option value="Support agent">Support agent</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Visitor">Visitor</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm mb-4" htmlFor="option3">
                  Mode
                </label>
                <Select
                  className="border rounded h-12 w-full text-base py-2 px-3 text-gray-400 leading-tight focus:border-2 focus:shadow-outline focus:border-blue-500 outline-none focus:ring-blue-500"
                  id="mode"
                  ref={mode}
                  defaultValue="Chat"
                >
                  <option value="Chat">Chat</option>
                  <option value="Message">Message</option>
                  <option value="Call">Call</option>
                </Select>
              </div>
              <div>
                <label className="block text-sm mb-4" htmlFor="option4">
                  Refference
                </label>
                <Select
                  className="border rounded h-12 text-base w-full py-2 px-3 text-gray-400 leading-tight focus:border-2 focus:shadow-outline focus:border-blue-500 outline-none focus:ring-blue-500"
                  id="refference"
                  ref={refference}
                  defaultValue="Include as link"
                >
                  <option value="Include as link">Include as link</option>
                  <option value="Use refferal code">Use refferal code</option>
                  <option value="Invitation">Invitation</option>
                </Select>
              </div>
              <div>
                <label className="block text-base mb-4" htmlFor="option5">
                  Limit chat to x messages
                </label>
                <input
                  className="appearance-none h-12 rounded border w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:border-2 focus:border-blue-500 focus:shadow-outline focus:ring-blue-500 outline-none"
                  id="limit"
                  ref={limit}
                  defaultValue="10"
                  type="text"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-sm mb-4" htmlFor="option6">
                  Context size
                </label>
                <Select
                  className="border rounded h-12 w-full text-base py-2 px-3 text-gray-400 leading-tight focus:border-2 focus:shadow-outline focus:border-blue-500 outline-none focus:ring-blue-500"
                  id="contextSize"
                  ref={contextSize}
                  defaultValue="Small"
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-sm " htmlFor="option6">
                Sources
              </label>
              <MySelect
                defaultValue={[source[0], source[1]]}
                isMulti
                name="source"
                onChange={handleSelectChange}
                options={source}
                styles={customStyles}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
