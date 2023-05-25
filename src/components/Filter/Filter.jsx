import PropTypes from "prop-types";
import cssFilter from "./Filter.module.css";

export function Filter ({onFilter, filterValue}) {
    return (
        <label className={cssFilter.find}>
        Name
            <input
                type="text"
                name="filter"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                onChange={onFilter}
                value={filterValue}
                required
            />
        </label>
    )
}

Filter.propTypes = {
    onFilter: PropTypes.func,
    filterValue: PropTypes.string
}