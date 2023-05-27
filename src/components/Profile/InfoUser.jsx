import React from 'react'

export default function InfoUser({emailIcons, name, value}) {
    return (
        <div className="candidate_info_item">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}> {emailIcons} {name}:</div>
            <h3>{value}</h3>
        </div>
    )
}
