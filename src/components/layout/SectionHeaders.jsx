import React from 'react'

export default function SectionHeaders({ sectionHeaders, sectionSubHeaders }) {
    return (
        <div className="text-center">
            <h3 className="uppercase text-gray-500 font-semibold leading-4">
                {sectionHeaders}
            </h3>
            <h2 className="text-primary font-bold text-4xl italic">
                {sectionSubHeaders}
            </h2>
        </div>
    )
}
