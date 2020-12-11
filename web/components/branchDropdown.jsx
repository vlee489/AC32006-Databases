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
      const branch = branchSelected ? branchSelected : branches[0];
      if (!branchSelected) changeBranch(branches[0]);

      return (
        <DropdownButton id="dropdown-basic-button" title={branch.Name}>
          {
            branches.map(b => <Dropdown.Item key={b.BranchID} onClick={() => changeBranch(b)}>{b.Name}</Dropdown.Item>)
          }
        </DropdownButton>
      )
    }
  }

  export default withApollo({ ssr: false })(BranchDropdown);