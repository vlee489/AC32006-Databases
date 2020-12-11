import { GET_WAREHOUSE } from '../queries/warehouse';
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useQuery } from '@apollo/client';
import Spinner from './spinner';
import withApollo from "../libraries/apollo";

const WarehouseDropdown = ({ warehouseSelected, changeWarehouse }) => {
    const { loading, error, data } = useQuery(GET_WAREHOUSE);

    if (loading) return <Spinner />;
    if (error) return <p>{error}</p>;

    if (data) {
      const warehouses = data.getWarehouse;
      const warehouse = warehouseSelected ? warehouseSelected : warehouses[0];
      if (!warehouseSelected) changeWarehouse(warehouses[0]);

      return (
        <DropdownButton id="dropdown-basic-button" title={warehouse.Name}>
          {
            warehouses.map(w => <Dropdown.Item key={w.WarehouseID} onClick={() => changeWarehouse(w)}>{b.Name}</Dropdown.Item>)
          }
        </DropdownButton>
      )
    }
  }

  export default withApollo({ ssr: false })(WarehouseDropdown);