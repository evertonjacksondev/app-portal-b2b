import { Fragment } from 'react'
import { Button } from './Button'
import 'material-icons/iconfont/material-icons.css'



export const Icon = (props) => {
    return (
        <i translate="no" style={{ fontSize: 13 }} className='material-icons'>{props.name ? props.name : ''}</i>

    )
}


const IconButton = ({ iconName, background, label, ...others }) => {
    return (
        <Fragment>
            <Button {...others} background={background}>
                <Icon name={iconName} />
                {label}
            </Button>
        </Fragment >
    )
}

export default IconButton