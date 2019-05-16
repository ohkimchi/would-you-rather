import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  //todo
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class Homepage extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { questions } = this.props;
    const { value } = this.state;

    return (
      <div className='question_list'>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Answered"/>
            <Tab label="Unanswered"/>
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Answered</TabContainer>}
        {value === 1 && <TabContainer>Unanswered</TabContainer>}
      </div>
    );
  }
}

Homepage.propTypes = {
  questions: PropTypes.object.isRequired,
};

export default withStyles(styles)(Homepage);
