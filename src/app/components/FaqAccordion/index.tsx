import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { ReactComponent as Expand } from './assets/img/icon/expand.svg';
import { ReactComponent as Collapse } from './assets/img/icon/collapse.svg';

type AccordionProps = {
  title?: string;
  content?: string;
  isExpanded?: boolean;
};

const FaqAccordion = ({ title, content, isExpanded }: AccordionProps) => {
  const [expanded, setExpanded] = React.useState<boolean | undefined>(
    isExpanded,
  );

  const handleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <AccordionWrapper className="Accordion-wrapper">
      <Accordion
        expanded={expanded}
        onChange={handleExpand}
        className="custom-list-accordion"
      >
        <AccordionSummary
          expandIcon={
            <ExpandIcon>{expanded ? <Collapse /> : <Expand />}</ExpandIcon>
          }
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '100%', flexShrink: 0 }}>{title}</Typography>
        </AccordionSummary>
        <StyledAccordionContent>
          <Typography component="h5">{content}</Typography>
        </StyledAccordionContent>
      </Accordion>
    </AccordionWrapper>
  );
};
const AccordionWrapper = styled.div`
  width: 100%;
  margin: 12px 0px;
  .MuiAccordion-root {
    background: #181616;
    color: #ffffff;
    padding: 4px 6px;
    border-radius: 10px !important;
    width: 100%;
    &.Mui-expanded {
      .MuiButtonBase-root {
        border-bottom: 0.5px solid #575757;
      }
    }
    .MuiButtonBase-root {
      border-radius: 0px !important;
      padding: 0px !important;
      margin: 0 6px !important;
    }

    .MuiAccordionSummary-content {
      .MuiTypography-root {
        font-family: 'Urbanist' !important;
        color: #ffffff !important;
        font-size: 12px !important;
      }
    }
    .MuiTypography-root {
      font-size: 12px !important;
      font-family: 'Urbanist' !important;
    }
  }
`;
const StyledAccordionContent = styled(AccordionDetails)`
  color: #a7a7a7 !important;
  font-family: 'Urbanist' !important;
`;
const ExpandIcon = styled.div`
  margin-right: 6px;
  border-radius: 5px;
  width: 100%;
  text-align: center;
  display: flex;
`;
export default FaqAccordion;
