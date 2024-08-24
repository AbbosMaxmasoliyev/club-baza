import React from 'react'

export 	const changeDate = (originalDate) => {
    const day = String(originalDate.getDate()).padStart(2, '0');
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const year = originalDate.getFullYear();

    return `${year}-${month}-${day}`;
}