import React, { useState } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ContactUsTab from './components/ContactUsTab';
import FaqTab from './components/FAQTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index?: number;
  value?: number;
}
export function HelpCentreTab(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const [tabIndex, setTabIndex] = useState(0);
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ width: '100%', height: '100%' }}>{children}</Box>
        )}
      </div>
    );
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 0, borderColor: 'divider', width: '200px' }}>
        <StyledTab
          value={tabIndex}
          onChange={handleChange}
          defaultValue={0}
          aria-label="basic tabs example"
        >
          <Tab label="FAQ" {...a11yProps(0)} />
          <Tab label="Contact us" {...a11yProps(1)} />
        </StyledTab>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <FaqTab />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <ContactUsTab />
      </TabPanel>
    </Box>
  );
}
const StyledTab = styled(Tabs)`
  border: none !important;
  .Mui-selected {
    color: #e0be00 !important;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
  }
  .MuiTab-root {
    color: #ffffff;
    font-family: Urbanist;
    font-weight: 500;
    font-size: 13px;
    text-align: unset !important;
    align-items: unset;
    text-transform: unset;
  }
  .MuiAvatar-root {
    margin-bottom: 0 !important;
    width: 15px;
    height: 15px;
  }
  .MuiTabs-indicator {
    height: 2px;
    bottom: 0;
    background-color: #e0be00 !important;
  }
  .MuiBox-root {
    border: none !important;
  }
`;
