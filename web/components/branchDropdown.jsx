import { GET_BRANCHES } from '../queries/branch';
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useQuery } from '@apollo/client';
import Spinner from './spinner';
import withApollo from "../libraries/apollo";

const BranchDropdown = ({ branchSelected, changeBranch }) => {
    const { loading, error, data } = useQuery(GET_BRANCHES);

    if (loading) return <Spinner />;
    if (error) return <p>{error}</p>;

    if (data) {
      const branches = data.getBranches;

      return (
        <DropdownButton id="dropdown-basic-button" title={branchSelected.Name}>
          {
            branches.map(branch => <Dropdown.Item key={branch.BranchID} onClick={() => changeBranch(branch)}>{branch.Name}</Dropdown.Item>)
          }
        </DropdownButton>
      )
    }
  }

  export default withApollo({ ssr: false })(BranchDropdown);