import { Fragment } from 'react'
import { Button } from './Button'
import 'material-icons/iconfont/material-icons.css'
import * as FcIcons from "react-icons/fc";

export const Icon = (props) => {
    return (
        <i translate="no" style={{ fontSize: 13 }} className='material-icons'>{props.name ? props.name : ''}</i>

    )
}


const IconButton = ({ reactIcons = false, iconName, background, label, children, ...others }) => {
    return (
        <Fragment>
            <Button {...others} background={background}>
                <Icon name={iconName} />
                {label}
                {children}
            </Button>
        </Fragment>
    );
};

export default IconButton