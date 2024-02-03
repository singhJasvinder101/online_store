import React, { useState } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { IoChevronUp } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";

export default function MenuItemPriceProps({ name, props, setProps, addLabel }) {
    const [isOpen, setIsOpen] = useState(false)

    // function addProp() {
    //     setSizes(oldSizes => [...oldSizes, { name: '', price: 0 }]);
    // }
    function addProp() {
        setProps(oldSizes => [...oldSizes, { name: '', price: 0 }]);
    }

    function editProp(e, index, property) {
        const newValue = e.target.value;
        setProps(oldSizes => {
            const newSizes = [...oldSizes];
            newSizes[index][property] = newValue;
            return newSizes;
        });
    }

    function removeProp(index) {
        setProps(oldSizes => {
            const newSizes = [...oldSizes];
            newSizes.splice(index, 1);
            return newSizes;
        });
    }

    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="inline-flex p-1 border-0 justify-start"
                type="button">
                {isOpen && (
                    <IoChevronUp className='mt-1' />
                )}
                {!isOpen && (
                    <IoChevronDownOutline className='mt-1' />
                )}
                <span>{name}</span>
                <span>({props?.length})</span>
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.length > 0 && props.map((size, index) => (
                    <div key={index} className="flex items-end gap-2">
                        <div>
                            <label> Name</label>
                            <input type="text"
                                placeholder="Size name"
                                value={size.name}
                                onChange={ev => editProp(ev, index, 'name')}
                            />
                        </div>
                        <div>
                            <label>Extra price</label>
                            <input type="text" placeholder="Extra price"
                                value={size.price}
                                onChange={ev => editProp(ev, index, 'price')}
                            />
                        </div>
                        <div>
                            <button type="button"
                                onClick={() => removeProp(index)}
                                className="bg-white mb-2 text-2xl px-2">
                                <IoIosCloseCircleOutline />
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addProp}
                    className="bg-white items-center">
                    <FaPlus className="w-4 h-4" />
                    <span>{addLabel}</span>
                </button>
            </div>
        </div>
    )
}
