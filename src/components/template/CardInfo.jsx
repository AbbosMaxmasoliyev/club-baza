
import { useState } from 'react'
import Segment from '../ui/Segment'


const SelectView = ({ setView, view }) => {


    return (
        <Segment size={"md"} value={[view]} onChange={value => setView(value[0])}>
            <Segment.Item value="users">Foydalanuvchilar</Segment.Item>
            <Segment.Item value="founder">Asoschilar</Segment.Item>
            <Segment.Item value="managers">Menejerlar</Segment.Item>
            <Segment.Item value="projects">Loyihalar</Segment.Item>
        </Segment>
    )
}

export default SelectView

