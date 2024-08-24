
import React, { useState } from 'react'
import Select from '../../components/ui/Select'
import { MultiSelect } from 'primereact/multiselect'

const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
    { value: 'blue', label: 'Blue', color: '#0052CC' },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630' },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
]

const MultiSelection = () => {
    const [selectedCategories, setSelectedCategories] = useState(null);
    return (
        <div>

            <MultiSelect value={selectedCategories} onChange={(e) => {
                setSelectedCategories(e.value)
            }
            }
             
                optionLabel="name"
                placeholder={"category_select"}
                maxSelectedLabels={3}
                className="w-full md:w-20rem"
            />
        </div>
    )
}

export default MultiSelection

