import React from 'react';
import categories from '../categories';
import priceRanges from '../priceRanges';
import styles from '../styles/sidebar.module.scss';

const Sidebar = () => {
    const CategoryGroup = () => {
        let jsx = [];
        let i = 0;

        for (const category in categories) {
            if (categories.hasOwnProperty(category)) {
                jsx.push(<Form.Check key={i} type="checkbox" label={categories[category].name} />);
                i++;
            }
        }

        return jsx;
    }

    const PriceGroup = () => (
        priceRanges.map((range, i) => {
            <Form.Check key={i} type="checkbox" label={priceRanges[range].upper} />
        })
    )

    return (
        <div className={styles.sidebar}>
            {/* <Nav className="flex-column">
                <Form>
                    <Form.Label>Categories:</Form.Label>
                    <Form.Group controlId="categoriesCheckbox">
                        <CategoryGroup />
                    </Form.Group> */}
                    {/* <Form.Group controlId="categoriesCheckbox"> */}
                    {/* <PriceGroup /> */}
                    {/* </Form.Group> */}
                {/* </Form>
            </Nav> */}
        </div>
    )
}

export default Sidebar
