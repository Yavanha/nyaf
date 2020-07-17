import JSX from '@nyaf/lib'
import "./hamburger.css";

export default class Hamburger extends BaseComponent<{}> {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e){
        this.props.onClick(e);
    }

    async render() {
        const {theme, cls, className, variant, active, onClick, ...rest} = this.props;

        return (
            <button className={`hamburger ${theme} ${variant} ${cls} ${className} ${active ? 'active' : ''}`} onClick={this.onClick} {...rest}>
                <span className={'line'}/>
                <span className={'line'}/>
                <span className={'line'}/>
            </button>
        )
    }
}

Hamburger.defaultProps = {
    cls: "",
    className: "",
    variant: 'menu-down',
    active: false,
    theme: "light",
    onClick: () => {}
};