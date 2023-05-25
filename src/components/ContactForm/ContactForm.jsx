import PropTypes from "prop-types";
import cssContForm from "./ContactForm.module.css";

export function ContactForm ({addContact}) {
    return (
                <form action="form" onSubmit={addContact} className={cssContForm.form}>
                    <label>
                    Name
                        <input
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                        />
                    </label>

                    <label>
                        Number
                        <input
                            type="tel"
                            name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                        />
                    </label>

                    <button type="submit">Додати контакт</button>
                </form>
    )
}

ContactForm.propTypes = {
    addContact: PropTypes.func,
}