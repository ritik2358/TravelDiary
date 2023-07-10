import React from 'react'

import { Link } from 'react-router-dom'

import Avatar from '../../shared/components/UIelements/Avatar'
import Card from '../../shared/components/UIelements/Card'
import './UserItem.css'
const UserItem = props => {
    return (
        <li className='user-item'>
            {/* <div className="user-item_content"> */}
            <Card className="user-item_content">
                <Link to={`/${props.id}/places`}>
                    <div className="user-item_image">
                        <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.name} />
                        {/* <img src={props.image} alt={props.name} /> */}
                    </div>
                    <div className="user-item_info">
                        <h2>{props.name}</h2>
                        <h3>
                            {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
                        </h3>
                    </div>
                </Link>
            </Card>
            {/* </div> */}
        </li>
    )
}

export default UserItem