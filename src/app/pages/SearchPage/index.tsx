import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  SearchPageContentWrapper,
  SearchPageWrapper,
} from 'app/components/Wrappers';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { DemoGenres } from './components/DemoGenres';
import SearchTextField from 'app/components/SearchTextField';
import CardImg1 from './assets/img/card/1.png';
import CardImg2 from './assets/img/card/2.png';
import CardImg3 from './assets/img/card/3.png';
import ImageCard from 'app/components/ImageCard';
import { ReactComponent as CloseIcon } from './assets/img/icons/close.svg';
import { RoutePath } from 'app/RoutePath';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenres } from 'store/slices/lookupSlice/selectors';
import useApi from 'services/mavapi/useApi';
import { GeneralApIsService } from 'services/openapi/services/GeneralApIsService';
import { useLookupSlice } from 'store/slices/lookupSlice';
import { useManageSearchPageSlice } from './slice';
import { selectAllSeriesList } from './slice/selectors';
import { SERVER_BASE_URL } from 'utils/constants';
import { SearchApiService } from 'services/openapi/services/SearchApiService';
import PageLoaderWrapper from 'app/components/PageLoaderWrapper';
import PulseLoader from 'react-spinners/PulseLoader';
import { selectPageLoader } from '../slice/selectors';
import { useManageAppSlice } from '../slice';

type Props = {};

const SearchPage = (props: Props) => {
  const { handleRequest, isLoading, error: apiError } = useApi();
  const { getLookupData } = GeneralApIsService;
  const { getMediaSearchList } = SearchApiService;
  const { actions: lookupActions } = useLookupSlice();
  const { actions: searchActions } = useManageSearchPageSlice();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  //Loader
  const pageLoader = useSelector(selectPageLoader);
  const { actions: AppActions } = useManageAppSlice();

  //Selectors
  const Genres = useSelector(selectGenres);
  const allSeriesList = useSelector(selectAllSeriesList);

  //useStates
  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(
    undefined,
  );
  const [selectedGenre, setSelectedGenre] = React.useState<string | undefined>(
    '',
  );

  //handle Genre click
  const handleListItemClick = (index?: number, name?: string) => {
    if (index === selectedIndex) {
      setSelectedGenre('');
      setSelectedIndex(undefined);
    } else {
      setSelectedGenre(name);
      setSelectedIndex(index);
    }
  };
  const handleSeriesViewClick = (id: number) => {
    if (id) {
      navigate(
        RoutePath.individualview.path.replace(':seriesId', id.toString()),
      );
    }
  };

  //handle  backToHomeclick
  const handleBackToHomeClick = () => {
    // navigate(RoutePath.homepage.path);
    // Changed for fusion
    navigate(RoutePath.fusionhomepage.path);
  };
  //handle get Genre lookup
  const handleGetLookup = () => {
    handleRequest(getLookupData('genres')).then(responseBody => {
      if (!responseBody) return;

      dispatch(lookupActions.addGenres(responseBody?.data?.genres));
      dispatch(lookupActions.addLanguages(responseBody?.data?.languages));
    });
  };
  //HandleGet Media Search List
  const handleGetMediaSearchResult = (text: string) => {
    handleRequest(getMediaSearchList(text ?? '')).then(responseBody => {
      if (responseBody) {
        dispatch(searchActions.setAllSeriesList(responseBody?.data?.series));
        dispatch(AppActions.setPageLoader(false));
      } else return;
    });
  };

  //handle onInput Change
  const handleChange = (
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    handleGetMediaSearchResult(e?.target.value! ?? '');
  };
  useEffect(() => {
    dispatch(AppActions.setPageLoader(true));
    handleGetLookup();
    handleGetMediaSearchResult('');
  }, []);
  return (
    <>
      {pageLoader ? (
        <>
          <PageLoaderWrapper>
            <PulseLoader color="#f4793b" />
          </PageLoaderWrapper>
        </>
      ) : (
        <SearchPageWrapper>
          <SearchPageContentWrapper className="SearchPageContentWrapper">
            <SearchPageWrapperContent>
              <Box sx={{ width: '100%', padding: '60px 60px 25px 60px ' }}>
                <CloseIcon
                  style={{ cursor: 'pointer' }}
                  onClick={handleBackToHomeClick}
                />
              </Box>
              <Box sx={{ width: '100%', padding: '0 35px 0px 100px' }}>
                <StyledSearchTextField
                  placeholder={`Search any title by name ${
                    selectedGenre ? 'in ' + selectedGenre : ''
                  }`}
                  onChange={e => handleChange(e)}
                />
              </Box>
            </SearchPageWrapperContent>
            <ContentWrapper className="search-ContentWrapper">
              <StyledListWrapper className="search-list">
                <Box className="main-genres-list-box" sx={{ width: 200 }}>
                  <List
                    className="main-genres-list"
                    component="nav"
                    aria-label="main-genres-list"
                  >
                    {Genres?.map((item, index) => {
                      return (
                        <ListItemButton
                          key={index}
                          selected={item?.id === selectedIndex}
                          onClick={e =>
                            handleListItemClick(item?.id, item.name)
                          }
                        >
                          <ListItemText>{item?.name}</ListItemText>
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Box>
              </StyledListWrapper>
              <RightContentWrapper className="search-content">
                <CardContentWrapper>
                  {allSeriesList?.map((item, index) => (
                    <ImageCard
                      key={index}
                      poster={
                        item?.poster ? SERVER_BASE_URL + item?.poster : ''
                      }
                      onClick={e => handleSeriesViewClick(item?.id!)}
                    />
                  ))}
                </CardContentWrapper>
              </RightContentWrapper>
            </ContentWrapper>
          </SearchPageContentWrapper>
        </SearchPageWrapper>
      )}
    </>
  );
};
const SearchPageWrapperContent = styled.div`
  @media (min-width: 1366px) and (max-width: 4000px) {
    font-size: 24px;
  }
  @media (min-width: 1200px) and (max-width: 1365px) {
    font-size: 22px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 20px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 18px;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 15px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    display: flex;
    align-items: center;
    padding: 15px 10px 0 10px;
    > div {
      &:nth-child(1) {
        padding: 1px 7px;
        display: inline-flex;
        align-items: center;
        width: 35px;
        height: 20px;
      }
      &:nth-child(2) {
        width: calc(100% - 35px);
        padding: 0;
      }
    }
  }
`;
const StyledListWrapper = styled.div`
  margin: 6px 0 !important;
  padding: 0px;
  .main-genres-list-box {
    @media (min-width: 320px) and (max-width: 575px) {
      width: 100%;
    }
    nav.MuiList-root {
      background: none !important;
      color: #ffffff !important;
      // height: 600px;
      max-height: calc(100vh - 172px);
      overflow: auto;
      @media (min-width: 320px) and (max-width: 575px) {
        width: 100%;
        padding: 0px !important;
      }
      ::-webkit-scrollbar {
        width: 5px;
        margin-left: 3px;
      }
      ::-webkit-scrollbar-track {
        background: transparent !important;
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb {
        width: 9px;
        background: #201e1e !important;
        border-radius: 10px;
      }
      .MuiButtonBase-root {
        background: none !important;
        &:hover {
          color: #f4793b !important;
        }
        .MuiTypography-root {
          font-family: Urbanist !important;
          font-size: 15px;
          letter-spacing: 1px;
          @media (min-width: 576px) and (max-width: 767px) {
            font-size: 13px;
          }
          @media (min-width: 320px) and (max-width: 575px) {
            font-size: 12px;
          }
        }
        &.Mui-selected {
          background: none !important;
          color: #f4793b !important;
        }
      }
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 15px 40px;
  height: calc(100vh - 122px);
  @media (min-width: 1200px) and (max-width: 1365px) {
    height: auto;
    padding: 15px 0;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    height: auto;
    padding: 15px 0;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    height: auto;
    padding: 15px 0;
  }
  @media (min-width: 576px) and (max-width: 767px) {
    height: auto;
    padding: 15px 0;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    height: auto;
    padding: 15px 0;
    .search-list {
      width: 130px;
    }
    .search-content {
      width: calc(100% - 130px);
    }
  }
`;
const RightContentWrapper = styled.div`
  width: calc(100% - 200px);
  max-height: calc(100vh - 172px);
  padding: 0px 20px;
  @media (min-width: 320px) and (max-width: 575px) {
    padding-left: 5px;
  }
`;
const CardContentWrapper = styled.div`
  max-height: calc(100vh - 172px);
  overflow: auto;
  margin: 20px 0px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  @media (min-width: 320px) and (max-width: 575px) {
    padding-right: 5px;
  }
  ::-webkit-scrollbar {
    width: 5px;
    margin-left: 3px;
  }
  ::-webkit-scrollbar-track {
    background: transparent !important;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    width: 9px;
    background: #201e1e !important;
    border-radius: 10px;
  }
  .fRXMuu .MuiPaper-root.MuiPaper-elevation img.MuiCardMedia-root {
    width: 100%;
    height: auto;
    @media (min-width: 1366px) and (max-width: 4000px) {
      width: 236px;
      height: 320px;
    }
    @media (min-width: 1200px) and (max-width: 1365px) {
      width: 195px;
      height: 260px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      width: 146px;
      height: 200px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      width: 95px;
      height: 140px;
    }
    @media (min-width: 576px) and (max-width: 767px) {
      width: 100px;
      height: 140px;
    }
    @media (min-width: 320px) and (max-width: 575px) {
      width: 90px;
      height: 130px;
    }
  }
`;
const StyledSearchTextField = styled(SearchTextField)`
  @media (min-width: 576px) and (max-width: 767px) {
    height: 50px;
  }
  @media (min-width: 320px) and (max-width: 575px) {
    height: 35px;
    padding: 5px 20px !important;
    input {
      height: 35px !important;
      font-size: 10px !important;
    }
    svg {
      width: 12px;
    }
  }
`;

export default SearchPage;
