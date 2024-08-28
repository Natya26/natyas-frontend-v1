// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import {
//   FloatLabel,
//   HeadingTitle,
//   TextFieldContentLabel,
//   ListHeadLabel,
//   StyledLabel,
//   SeasonAndDurationLabel,
// } from '../../components/MLabel';
// import AddButton from 'app/components/AddButton';
// import DrawerButton from 'app/components/DrawerButton';
// import DrawerEpisodeCard from 'app/components/DrawerEpisodeCard';
// import { ReactComponent as CloseIcon } from './assets/img/icons/close.svg';
// import { ReactComponent as RightArrow } from './assets/img/icons/rightArrow.svg';
// import { ReactComponent as LeftArrow } from './assets/img/icons/leftArrow.svg';
// import {
//   HomeHeadLabelWrapper,
//   HomeSectionWrapper,
//   SectionWrapper,
// } from 'app/components/Wrappers';
// import ImageCard from 'app/components/ImageCard';
// import 'react-slideshow-image/dist/styles.css';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import RecommendedCard from 'app/components/RecommendedCard';
// import {
//   RecommendedCarouselResponsive,
//   SliderCarouselResponsive,
//   MainCarouselResponsive,
//   drawerResponsive,
// } from './components/CarouselResponsiveData';
// import { useDispatch, useSelector } from 'react-redux';
// import useApi from 'services/mavapi/useApi';
// import { HomeApiService } from 'services/openapi/services/HomeApiService';
// import {
//   selectAllSeries,
//   selectFeatured,
//   selectAllHindiSeries,
//   selectAllMalayalamSeries,
//   selectRecommented,
//   selectAllTamilSeries,
//   selectAllMyList,
//   selectNewAndHotList,
//   selectComingSoonList,
//   selectFetchChanges,
//   selectCarouselIsMoving,
// } from './slice/selectors';
// import { useManageHomeSlice } from './slice';
// import { SERVER_BASE_URL } from 'utils/constants';
// import ComingSoonCard from 'app/components/ComingSoonCard';
// import dateFormat from 'dateformat';
// import { SeriesApIsService } from 'services/openapi/services/SeriesApIsService';
// import { useIndividualViewSlice } from '../IndividualViewPage/slice';
// import { useNavigate } from 'react-router-dom';
// import { RoutePath } from 'app/RoutePath';
// import sd from 'simple-duration-converter';
// import { selectPageLoader } from '../slice/selectors';
// import PageLoaderWrapper from 'app/components/PageLoaderWrapper';
// import PulseLoader from 'react-spinners/PulseLoader';
// import { useManageAppSlice } from '../slice';
// import { Footer } from 'app/components/Footer';
// import { SubscriptionApiService } from 'services/openapi/services/SubscriptionApiService';
// import { useManageUserSlice } from '../Settings/slice';
// import { selectCurrentUserSubscription } from '../Settings/slice/selectors';
// import encodedBannerImg from './assets/img/icons/navigation.png';
// // import Thumbnail from './constants/index';

// type Props = {};

// const HomePage = (props: Props) => {
//   const navigate = useNavigate();
//   console.log(Thumbnail[0].image);
//   const [drawerWidth, setDrawerWidth] = useState<boolean>(false);
//   const handleToggleViewDrawer = e => {
//     setDrawerWidth(!drawerWidth);
//   };

//   const { actions } = useManageHomeSlice();
//   const { actions: AppActions } = useManageAppSlice();
//   const { actions: userActions } = useManageUserSlice();
//   const { actions: IndividualViewAction } = useIndividualViewSlice();
//   const [error, setError] = React.useState<unknown | null>();

//   //Selectors
//   const AllSeriesPaylord = useSelector(selectAllSeries);
//   const FeaturedPaylord = useSelector(selectFeatured);
//   const AllHindiSeriesPaylord = useSelector(selectAllHindiSeries);
//   const FetchPayload = useSelector(selectFetchChanges);
//   const AllMalayalamSeriesPaylord = useSelector(selectAllMalayalamSeries);
//   const AllRecommendedPaylord = useSelector(selectRecommented);
//   const AllTamilSeriesPaylord = useSelector(selectAllTamilSeries);
//   const GetMyListPayload = useSelector(selectAllMyList);
//   const NewAndHotListpayload = useSelector(selectNewAndHotList);
//   const ComingSoonListPayload = useSelector(selectComingSoonList);
//   const pageLoader = useSelector(selectPageLoader);
//   const CarouselIsMoving = useSelector(selectCarouselIsMoving);
//   //Currrent user subscription
//   const currentSubscription = useSelector(selectCurrentUserSubscription);

//   const { error: apiError, isLoading, handleRequest } = useApi();
//   const {
//     getHomePageList,
//     getMyList,
//     getNewAndHotList,
//     getComingSoonList,
//     addOrRemoveMyList,
//   } = HomeApiService;
//   const { getSeries, getSimilarSeries } = SeriesApIsService;
//   const { getUserSubscriptionPlan } = SubscriptionApiService;
//   const dispatch = useDispatch();
//   const handleComingSoonList = () => {
//     handleRequest(getComingSoonList())
//       .then(res => {
//         if (res.data) {
//           dispatch(actions.setComingSoonList(res?.data));
//         }
//       })
//       .catch(error => {
//         setError(apiError);
//       });
//   };
//   const handleNewAndHotlist = () => {
//     handleRequest(getNewAndHotList())
//       .then(res => {
//         if (res.data) {
//           dispatch(actions.setNewAndHotItems(res?.data?.items));
//           dispatch(actions.setNewAndHotList(res?.data?.series.slice(0, 6)));
//         }
//       })
//       .catch(error => {
//         setError(apiError);
//       });
//   };
//   const handleGetMyList = () => {
//     handleRequest(getMyList())
//       .then(res => {
//         if (res.data) {
//           dispatch(actions.setGetMyList(res?.data?.slice(0, 6)));
//         }
//       })
//       .catch(error => {
//         setError(apiError);
//       });
//   };

//   const handleAllHomeList = () => {
//     handleRequest(getHomePageList())
//       .then(res => {
//         if (res.data) {
//           dispatch(actions.setAllSeries(res?.data?.allSeries.slice(0, 6)));
//           dispatch(actions.setContinueWatching(res?.data?.continueWatching));
//           dispatch(actions.setUpfeatured(res?.data?.featured));
//           dispatch(actions.setHindiSeries(res?.data?.hindi.slice(0, 6)));
//           dispatch(actions.setUpItems(res?.data?.items));
//           dispatch(actions.setLatestSeries(res?.data?.latestSeries));
//           dispatch(
//             actions.setMalayalamSeries(res?.data?.malayalam.slice(0, 6)),
//           );
//           dispatch(actions.setRecommended(res?.data?.recommended.slice(0, 6)));
//           dispatch(actions.setTamilSeries(res?.data?.tamil.slice(0, 6)));
//           dispatch(actions.setTrailers(res?.data?.trailers));
//           dispatch(AppActions.setPageLoader(false));
//         }
//       })
//       .catch(error => {
//         setError(apiError);
//       });
//   };

//   const handleAddMyList = e => {
//     if (e === true) {
//       handleRequest(
//         addOrRemoveMyList({ series_id: FeaturedPaylord?.id }, 'ADD'),
//       )
//         .then(res => {
//           if (res.data) {
//             dispatch(actions.setFetchChanges(!FetchPayload));
//           }
//         })
//         .catch(error => {
//           setError(apiError);
//         });
//     } else {
//       handleRequest(
//         addOrRemoveMyList({ series_id: FeaturedPaylord?.id }, 'REMOVE'),
//       )
//         .then(res => {
//           if (res.data) {
//             dispatch(actions.setFetchChanges(!FetchPayload));
//           }
//         })
//         .catch(error => {
//           setError(apiError);
//         });
//     }
//   };
//   const release_date = '2024';
//   const releaseYear = dateFormat(
//     // FeaturedPaylord?.release_date?.toString(),
//     // 'yyyy',
//     release_date?.toString(),
//     'yyyy',
//   );
//   const handleSeriesViewClick = (id: number) => {
//     if (CarouselIsMoving) return;
//     else {
//       navigate(
//         RoutePath.individualview.path.replace(':seriesId', id.toString()),
//       );
//     }
//   };
//   const handleViewAll = (e: string) => {
//     if (e) {
//       navigate(RoutePath.listview.path.replace(':listName', e));
//     }
//   };
//   //Get User Subscription
//   const handleGetUserSubscription = () => {
//     handleRequest(getUserSubscriptionPlan())
//       .then(res => {
//         if (res?.data?.subscription) {
//           console.log(
//             res,
//             'user  subscription res from home--------------------------------------',
//           );
//           dispatch(
//             userActions.setCurrentUserSubscription(res?.data?.subscription),
//           );
//         }
//       })
//       .catch(err => console.log(err, 'user subscription err'));
//   };
//   //expiry date
//   const ExpiryDate: boolean =
//     currentSubscription?.valid_till! > new Date().toISOString();

//   const handleEpisodeClick = (id?: string) => {
//     if (CarouselIsMoving) {
//       return;
//     } else if (id) {
//       if (currentSubscription?.active && ExpiryDate) {
//         navigate(RoutePath.playvideo.path.replace(':videoId', id));
//       } else {
//         navigate(RoutePath.settings.path);
//         dispatch(userActions.setSettingsTabVal(4));
//       }
//       // navigate(RoutePath.playvideo.path.replace(':videoId', id));
//     }
//   };

//   const handleViewAllMyList = () => {
//     navigate(RoutePath.mylistpage.path);
//   };

//   React.useEffect(() => {
//     dispatch(AppActions.setPageLoader(true));
//     handleGetMyList();
//     handleNewAndHotlist();
//     handleComingSoonList();
//     handleGetUserSubscription();
//     handleAllHomeList();
//   }, []);

//   // React.useEffect(() => {
//   //   dispatch(AppActions.setPageLoader(true));
//   //   handleGetMyList();
//   //   handleAllHomeList();
//   //   handleNewAndHotlist();
//   //   handleComingSoonList();
//   // }, [FetchPayload]);

//   //changed for fusion
//   // const encodedBannerImg = encodeURI(SERVER_BASE_URL + FeaturedPaylord?.poster);
//   return (
//     <>
//       {pageLoader ? (
//         <>
//           <PageLoaderWrapper>
//             <PulseLoader color="#f4793b" />
//           </PageLoaderWrapper>
//         </>
//       ) : (
//         <HomePageWrapper>
//           <Wrapper
//             className={`main-wrapper ${
//               drawerWidth ? 'open-drawer' : 'close-drawer'
//             }`}
//           >
//             <Carousel
//               swipeable={false}
//               draggable={false}
//               showDots={false}
//               responsive={MainCarouselResponsive}
//               ssr={true}
//               infinite={false}
//               arrows={false}
//               autoPlay={false}
//               autoPlaySpeed={1000}
//               keyBoardControl={false}
//               customTransition="all .5"
//               transitionDuration={500}
//               containerClass="carousel-container"
//               removeArrowOnDeviceType={['tablet', 'mobile']}
//               deviceType={'desktop'}
//               dotListClass="custom-dot-list-style"
//               itemClass="carousel-item-padding-40-px"
//               beforeChange={() => dispatch(actions.setCarouselIsMoving(true))}
//               afterChange={() => dispatch(actions.setCarouselIsMoving(false))}
//             >
//               <ImageBackground
//                 style={{
//                   // background: `linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%), url(${encodedBannerImg})`,
//                   background: `linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%),url(${Thumbnail[1].image})`,
//                   backgroundSize: 'cover',
//                   backgroundRepeat: 'no-repeat',
//                 }}
//               >
//                 <ContentWrapper>
//                   <Content>
//                     <StyledLabel>featured series</StyledLabel>
//                     <div className="headingtitle">
//                       {/* <HeadingTitle>{FeaturedPaylord?.name}</HeadingTitle> */}
//                       <HeadingTitle>{Thumbnail[1].title}</HeadingTitle>
//                     </div>
//                     <TextFieldContentLabel className="move-and-fade">
//                       {/* {FeaturedPaylord?.description} */}
//                       {Thumbnail[1].description}
//                     </TextFieldContentLabel>
//                     {/* <div className="icon">
//                       <AddButton
//                         value={FeaturedPaylord?.isInMyList}
//                         onClick={handleAddMyList}
//                       />
//                     </div> */}
//                     {/* <div className="mylist">
//                       <FloatLabel>My List</FloatLabel>
//                     </div> */}
//                     <TextFieldContentLabel>
//                       {/* {releaseYear} - {FeaturedPaylord?.languages?.[0]?.name} */}
//                       {releaseYear}
//                     </TextFieldContentLabel>
//                   </Content>
//                 </ContentWrapper>
//                 {!drawerWidth && (
//                   <SyledDrawerButton>
//                     <DrawerButton
//                       onClick={e => handleToggleViewDrawer(e)}
//                     ></DrawerButton>
//                   </SyledDrawerButton>
//                 )}
//                 <SyledDrawerBlock className="floating-drawer">
//                   {drawerWidth && (
//                     <SyledDrawerContentWrapper className="SyledDrawerContentWrapper">
//                       <SyledDrawerHeaderBox>
//                         <DrawerHeaderTitleBox>
//                           <SyledDrawerHeaderTitle>
//                             {/* {FeaturedPaylord?.seasons?.[0]?.name} */}
//                             Season 1
//                           </SyledDrawerHeaderTitle>
//                           <SyledDrawerHeaderSubLabel>
//                             {FeaturedPaylord?.episode_count
//                               ? FeaturedPaylord?.episode_count + 'episodes'
//                               : ''}
//                           </SyledDrawerHeaderSubLabel>
//                         </DrawerHeaderTitleBox>
//                         <CloseIcon onClick={handleToggleViewDrawer} />
//                       </SyledDrawerHeaderBox>
//                       <Carousel
//                         customRightArrow={<RightArrow className="r-arrow" />}
//                         customLeftArrow={<LeftArrow className="l-arrow" />}
//                         swipeable={true}
//                         draggable={true}
//                         showDots={false}
//                         responsive={drawerResponsive}
//                         infinite={false}
//                         arrows={true}
//                         autoPlay={false}
//                         autoPlaySpeed={1000}
//                         keyBoardControl={true}
//                         customTransition="transform 300ms ease-in-out"
//                         transitionDuration={500}
//                         dotListClass="custom-dot-list-style"
//                         itemClass="carousel-item-padding-40-px"
//                         beforeChange={() =>
//                           dispatch(actions.setCarouselIsMoving(true))
//                         }
//                         afterChange={() =>
//                           dispatch(actions.setCarouselIsMoving(false))
//                         }
//                       >
//                         {FeaturedPaylord?.seasons?.[0]?.episodes?.map(
//                           (item, index) => (
//                             <div>
//                               {/*updated for fusion */}
//                               <DrawerEpisodeCard
//                                 onClick={e =>
//                                   handleEpisodeClick(
//                                     Thumbnail[1]?.id.toString(),
//                                   )
//                                 }
//                                 key={index}
//                                 poster={
//                                   item?.poster
//                                     ? SERVER_BASE_URL + item?.poster
//                                     : ''
//                                 }
//                               />
//                               <Drawerlabel>
//                                 <div className="group-label">
//                                   <SeasonAndDurationLabel className="season">
//                                     {/* {item.name} */}
//                                     {/* //updated for fusion */}
//                                     {Thumbnail[1].title}
//                                   </SeasonAndDurationLabel>{' '}
//                                   <TextFieldContentLabel>
//                                     {/* {item.description} */}
//                                     {/* //updated for fusion */}
//                                     {Thumbnail[1].title}
//                                   </TextFieldContentLabel>
//                                 </div>
//                                 <SeasonAndDurationLabel>
//                                   {sd.stringify(item?.duration)}
//                                 </SeasonAndDurationLabel>
//                               </Drawerlabel>
//                             </div>
//                           ),
//                         )}
//                       </Carousel>
//                     </SyledDrawerContentWrapper>
//                   )}
//                 </SyledDrawerBlock>
//               </ImageBackground>
//             </Carousel>
//           </Wrapper>
//           {/* My List Slider */}
//           {/* {GetMyListPayload?.length ? (
//             <SectionWrapper>
//               <HomeHeadLabelWrapper>
//                 <ListHeadLabel>MY LIST</ListHeadLabel>
//                 <ViewAllLabel onClick={handleViewAllMyList}>
//                   View All
//                 </ViewAllLabel>
//               </HomeHeadLabelWrapper>
//               <StyledHomeSectionWrapper>
//                 <Carousel
//                   swipeable={true}
//                   draggable={true}
//                   showDots={false}
//                   responsive={SliderCarouselResponsive}
//                   ssr={true}
//                   infinite={false}
//                   arrows={false}
//                   autoPlay={false}
//                   keyBoardControl={false}
//                   customTransition="transform 300ms ease-in-out"
//                   transitionDuration={500}
//                   containerClass="carousel-container"
//                   deviceType={'desktop'}
//                   dotListClass="custom-dot-list-style"
//                   beforeChange={() =>
//                     dispatch(actions.setCarouselIsMoving(true))
//                   }
//                   afterChange={() =>
//                     dispatch(actions.setCarouselIsMoving(false))
//                   }
//                 >
//                   {GetMyListPayload?.map((item, index) => (
//                     <ImageCard
//                       key={index}
//                       poster={
//                         item?.poster ? SERVER_BASE_URL + item?.poster : ''
//                       }
//                       onClick={e => handleSeriesViewClick(item.id!)}
//                     />
//                   ))}
//                 </Carousel>
//               </StyledHomeSectionWrapper>
//             </SectionWrapper>
//           ) : (
//             ''
//           )} */}
//           {/* New & Hot */}
//           {/* {NewAndHotListpayload?.length ? ( */}
//           {Thumbnail?.length ? (
//             <RecommendedWrapper>
//               <SectionWrapper>
//                 <HomeHeadLabelWrapper>
//                   <StyledListHeadLabel>
//                     NEW AND <label className="hot">HOT!</label>
//                   </StyledListHeadLabel>
//                   <ViewAllLabel onClick={e => handleViewAll('newandhot')}>
//                     View All
//                   </ViewAllLabel>
//                 </HomeHeadLabelWrapper>

//                 <HomeSectionWrapper>
//                   <Carousel
//                     centerMode={true}
//                     swipeable={true}
//                     draggable={true}
//                     showDots={false}
//                     responsive={RecommendedCarouselResponsive}
//                     ssr={true}
//                     infinite={false}
//                     arrows={false}
//                     autoPlay={false}
//                     autoPlaySpeed={1000}
//                     keyBoardControl={false}
//                     customTransition="transform 300ms ease-in-out"
//                     transitionDuration={500}
//                     dotListClass="custom-dot-list-style"
//                     itemClass="recommended"
//                     beforeChange={() =>
//                       dispatch(actions.setCarouselIsMoving(true))
//                     }
//                     afterChange={() =>
//                       dispatch(actions.setCarouselIsMoving(false))
//                     }
//                   >
//                     {/* {NewAndHotListpayload?.map((item, index) => ( */}
//                     {Thumbnail?.map((item, index) => (
//                       <div key={index}>
//                         <RecommendedCard
//                           poster={
//                             // item?.poster ? SERVER_BASE_URL + item?.poster : ''
//                             item?.image
//                           }
//                           onClick={e => handleSeriesViewClick(item.id!)}
//                         />
//                         <TextFieldContentLabel className="recomended-label">
//                           {/* {item.description} */}
//                         </TextFieldContentLabel>
//                       </div>
//                     ))}
//                   </Carousel>
//                 </HomeSectionWrapper>
//               </SectionWrapper>
//             </RecommendedWrapper>
//           ) : (
//             ''
//           )}
//           {/* My List Slider */}
//           {/* {AllSeriesPaylord?.length ? (
//             <SectionWrapper>
//               <HomeHeadLabelWrapper>
//                 <ListHeadLabel>ALL SERIES</ListHeadLabel>
//                 <ViewAllLabel onClick={e => handleViewAll('allseries')}>
//                   View All
//                 </ViewAllLabel>
//               </HomeHeadLabelWrapper>
//               <StyledHomeSectionWrapper>
//                 <Carousel
//                   swipeable={true}
//                   draggable={true}
//                   showDots={false}
//                   responsive={SliderCarouselResponsive}
//                   ssr={true}
//                   infinite={false}
//                   arrows={false}
//                   autoPlay={false}
//                   autoPlaySpeed={1000}
//                   keyBoardControl={false}
//                   customTransition="transform 300ms ease-in-out"
//                   transitionDuration={500}
//                   containerClass="carousel-container"
//                   removeArrowOnDeviceType={['tablet', 'mobile']}
//                   deviceType={'desktop'}
//                   dotListClass="custom-dot-list-style"
//                   itemClass="carousel-item-padding-40-px"
//                   beforeChange={() =>
//                     dispatch(actions.setCarouselIsMoving(true))
//                   }
//                   afterChange={() =>
//                     dispatch(actions.setCarouselIsMoving(false))
//                   }
//                 >
//                   {AllSeriesPaylord?.map((item, index) => (
//                     <ImageCard
//                       key={index}
//                       poster={
//                         item?.poster ? SERVER_BASE_URL + item?.poster : ''
//                       }
//                       onClick={e => handleSeriesViewClick(item.id!)}
//                     />
//                   ))}
//                 </Carousel>
//               </StyledHomeSectionWrapper>
//             </SectionWrapper>
//           ) : (
//             ''
//           )} */}
//           {/* Sub Main Carousel */}
//           {/* {ComingSoonListPayload?.length ? (
//             <ComingSoonWrapper>
//               <HomeHeadLabelWrapper>
//                 <ListHeadLabel>COMING SOON!</ListHeadLabel>
//               </HomeHeadLabelWrapper>

//               <Carousel
//                 swipeable={true}
//                 draggable={true}
//                 showDots={true}
//                 responsive={MainCarouselResponsive}
//                 ssr={true}
//                 infinite={false}
//                 arrows={false}
//                 autoPlay={false}
//                 autoPlaySpeed={1000}
//                 keyBoardControl={false}
//                 customTransition="transform 300ms ease-in-out"
//                 transitionDuration={500}
//                 containerClass="carousel-container"
//                 removeArrowOnDeviceType={['tablet', 'mobile']}
//                 deviceType={'desktop'}
//                 dotListClass="custom-dot-list-style"
//                 itemClass="comingsoon"
//                 beforeChange={() => dispatch(actions.setCarouselIsMoving(true))}
//                 afterChange={() => dispatch(actions.setCarouselIsMoving(false))}
//               >
//                 {ComingSoonListPayload?.map((item, index) => (
//                   <div key={index}>
//                     <ComingSoonCard
//                       poster={
//                         item?.poster ? SERVER_BASE_URL + item?.poster : ''
//                       }
//                       onClick={e => handleSeriesViewClick(item.id!)}
//                     />
//                   </div>
//                 ))}
//               </Carousel>
//             </ComingSoonWrapper>
//           ) : (
//             ''
//           )} */}

//           {/* Recommended */}

//           {/* {AllRecommendedPaylord?.length ? (
//             <RecommendedWrapper>
//               <SectionWrapper>
//                 <HomeHeadLabelWrapper>
//                   <ListHeadLabel>Recommended for you</ListHeadLabel>
//                   <ViewAllLabel onClick={e => handleViewAll('recommended')}>
//                     View All
//                   </ViewAllLabel>
//                 </HomeHeadLabelWrapper>

//                 <HomeSectionWrapper>
//                   <Carousel
//                     centerMode={true}
//                     swipeable={true}
//                     draggable={true}
//                     showDots={false}
//                     responsive={RecommendedCarouselResponsive}
//                     infinite={false}
//                     arrows={false}
//                     autoPlay={false}
//                     keyBoardControl={false}
//                     transitionDuration={500}
//                     dotListClass="custom-dot-list-style"
//                     itemClass="recommended"
//                     beforeChange={() =>
//                       dispatch(actions.setCarouselIsMoving(true))
//                     }
//                     afterChange={() =>
//                       dispatch(actions.setCarouselIsMoving(false))
//                     }
//                   >
//                     {AllRecommendedPaylord?.map((item, index) => (
//                       <div key={index}>
//                         <RecommendedCard
//                           poster={
//                             item?.poster ? SERVER_BASE_URL + item?.poster : ''
//                           }
//                           onClick={e => handleSeriesViewClick(item.id!)}
//                         />
//                         <TextFieldContentLabel className="recomended-label">
//                           {item.description}
//                         </TextFieldContentLabel>
//                       </div>
//                     ))}
//                   </Carousel>
//                 </HomeSectionWrapper>
//               </SectionWrapper>
//             </RecommendedWrapper>
//           ) : (
//             ''
//           )} */}

//           {/* Malayalam */}
//           {/* {AllMalayalamSeriesPaylord?.length ? (
//             <SectionWrapper>
//               <HomeHeadLabelWrapper>
//                 <ListHeadLabel>Malayalam</ListHeadLabel>
//                 <ViewAllLabel onClick={e => handleViewAll('malayalam')}>
//                   View All
//                 </ViewAllLabel>
//               </HomeHeadLabelWrapper>
//               <StyledHomeSectionWrapper>
//                 <Carousel
//                   swipeable={true}
//                   draggable={true}
//                   showDots={false}
//                   responsive={SliderCarouselResponsive}
//                   ssr={true}
//                   infinite={false}
//                   arrows={false}
//                   autoPlay={false}
//                   keyBoardControl={false}
//                   customTransition="transform 300ms ease-in-out"
//                   transitionDuration={500}
//                   containerClass="carousel-container"
//                   deviceType={'desktop'}
//                   dotListClass="custom-dot-list-style"
//                   beforeChange={() =>
//                     dispatch(actions.setCarouselIsMoving(true))
//                   }
//                   afterChange={() =>
//                     dispatch(actions.setCarouselIsMoving(false))
//                   }
//                 >
//                   {AllMalayalamSeriesPaylord?.map((item, index) => (
//                     <ImageCard
//                       key={index}
//                       poster={
//                         item?.poster ? SERVER_BASE_URL + item?.poster : ''
//                       }
//                       onClick={e => handleSeriesViewClick(item.id!)}
//                     />
//                   ))}
//                 </Carousel>
//               </StyledHomeSectionWrapper>
//             </SectionWrapper>
//           ) : (
//             ''
//           )} */}

//           {/* Hindi */}
//           {/* {AllHindiSeriesPaylord?.length ? (
//             <SectionWrapper>
//               <HomeHeadLabelWrapper>
//                 <ListHeadLabel>Hindi</ListHeadLabel>
//                 <ViewAllLabel onClick={e => handleViewAll('hindi')}>
//                   View All
//                 </ViewAllLabel>
//               </HomeHeadLabelWrapper>
//               <StyledHomeSectionWrapper>
//                 <Carousel
//                   swipeable={true}
//                   draggable={true}
//                   showDots={false}
//                   responsive={SliderCarouselResponsive}
//                   ssr={true}
//                   infinite={false}
//                   arrows={false}
//                   autoPlay={false}
//                   keyBoardControl={false}
//                   customTransition="transform 300ms ease-in-out"
//                   transitionDuration={500}
//                   containerClass="carousel-container"
//                   deviceType={'desktop'}
//                   dotListClass="custom-dot-list-style"
//                   beforeChange={() =>
//                     dispatch(actions.setCarouselIsMoving(true))
//                   }
//                   afterChange={() =>
//                     dispatch(actions.setCarouselIsMoving(false))
//                   }
//                 >
//                   {AllHindiSeriesPaylord?.map((item, index) => (
//                     <ImageCard
//                       key={index}
//                       poster={
//                         item?.poster ? SERVER_BASE_URL + item?.poster : ''
//                       }
//                       onClick={e => handleSeriesViewClick(item.id!)}
//                     />
//                   ))}
//                 </Carousel>
//               </StyledHomeSectionWrapper>
//             </SectionWrapper>
//           ) : (
//             ''
//           )} */}

//           {/* Tamil */}
//           {/* {AllTamilSeriesPaylord?.length ? (
//             <SectionWrapper>
//               <HomeHeadLabelWrapper>
//                 <ListHeadLabel>Tamil</ListHeadLabel>
//                 <ViewAllLabel onClick={e => handleViewAll('tamil')}>
//                   View All
//                 </ViewAllLabel>
//               </HomeHeadLabelWrapper>
//               <StyledHomeSectionWrapper>
//                 <Carousel
//                   swipeable={true}
//                   draggable={true}
//                   showDots={false}
//                   responsive={SliderCarouselResponsive}
//                   ssr={true}
//                   infinite={false}
//                   arrows={false}
//                   autoPlay={false}
//                   keyBoardControl={false}
//                   customTransition="transform 300ms ease-in-out"
//                   transitionDuration={500}
//                   containerClass="carousel-container"
//                   deviceType={'desktop'}
//                   dotListClass="custom-dot-list-style"
//                   beforeChange={() =>
//                     dispatch(actions.setCarouselIsMoving(true))
//                   }
//                   afterChange={() =>
//                     dispatch(actions.setCarouselIsMoving(false))
//                   }
//                 >
//                   {AllTamilSeriesPaylord?.map((item, index) => (
//                     <ImageCard
//                       key={index}
//                       poster={
//                         item?.poster ? SERVER_BASE_URL + item?.poster : ''
//                       }
//                       onClick={e => handleSeriesViewClick(item.id!)}
//                     />
//                   ))}
//                 </Carousel>
//               </StyledHomeSectionWrapper>
//             </SectionWrapper>
//           ) : (
//             ''
//           )} */}
//           <Footer />
//         </HomePageWrapper>
//       )}
//     </>
//   );
// };

// const ViewAllLabel = styled(StyledLabel)`
//   color: #f4793b !important;
//   text-transform: initial !important;
//   letter-spacing: 1px !important;
//   cursor: pointer;
//   @media (min-width: 1366px) and (max-width: 4000px) {
//   }
//   @media (min-width: 1200px) and (max-width: 1365px) {
//   }
//   @media (min-width: 992px) and (max-width: 1199px) {
//   }
//   @media (min-width: 768px) and (max-width: 991px) {
//   }
//   @media (min-width: 576px) and (max-width: 767px) {
//   }
//   @media (min-width: 320px) and (max-width: 575px) {
//     font-size: 14px !important;
//   }
// `;
// const StyledListHeadLabel = styled(ListHeadLabel)`
//   font-weight: 700 !important;
// `;
// const ComingSoonWrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   padding: 5% 10%;
//   .react-multi-carousel-item {
//     display: flex;
//     justify-content: center;
//     padding-bottom: 35px;
//   }
//   .react-multi-carousel-list {
//     bottom: -4px;
//     width: 100%;
//   }
// `;
// const HomePageWrapper = styled.div`
//   background: #1e1e1e;
//   display: block;
//   width: 100%;
//   height: 100%;
//   .home-sub-carousal-wrapper {
//     button.nav.default-nav {
//       display: none !important;
//     }
//     ul.indicators {
//       padding: 0px !important;
//       li {
//         // margin: 0 5px !important;
//         button.each-slideshow-indicator {
//           &::before {
//             background: #ffffff !important;
//             width: 10px !important;
//             height: 10px !important;
//           }
//         }
//         button.each-slideshow-indicator.active {
//           &::before {
//             background: #f4793b !important;
//           }
//         }
//       }
//     }
//   }
//   .react-multi-carousel-dot--active button {
//     background: #f4793b !important;
//     border-color: #f4793b !important;
//   }
//   .react-multi-carousel-dot-list {
//     li {
//       // margin-right: 5px;
//     }
//   }
//   .react-multi-carousel-dot button {
//     width: 14px;
//     height: 14px;
//   }
//   .react-multi-carousel-track {
//     gap: 50px;
//     @media (min-width: 1366px) and (max-width: 4000px) {
//       gap: 60px;
//     }
//     @media (min-width: 1200px) and (max-width: 1365px) {
//       gap: 50px;
//     }
//     @media (min-width: 992px) and (max-width: 1199px) {
//       gap: 35px;
//     }
//     @media (min-width: 768px) and (max-width: 991px) {
//       gap: 20px;
//     }
//     @media (min-width: 576px) and (max-width: 767px) {
//       gap: 15px;
//     }
//     @media (min-width: 320px) and (max-width: 575px) {
//       gap: 10px !important;
//     }
//   }
// `;
// const DrawerHeaderTitleBox = styled.div`
//   margin-left: 11%;
//   margin-right: 10%;
//   @media (min-width: 1366px) and (max-width: 4000px) {
//     margin-left: 11%;
//     margin-right: 10%;
//   }
//   @media (min-width: 1200px) and (max-width: 1365px) {
//     margin-left: 11%;
//   }
//   @media (min-width: 992px) and (max-width: 1199px) {
//     margin-left: 11%;
//   }
//   @media (min-width: 768px) and (max-width: 991px) {
//     margin-left: 12%;
//   }
//   @media (min-width: 576px) and (max-width: 767px) {
//     margin-left: 13%;
//   }
//   @media (min-width: 320px) and (max-width: 575px) {
//     margin-left: 14%;
//   }
// `;
// const SyledDrawerButton = styled.div`
//   position: absolute !important;
//   top: 42%;
//   right: 20px;
//   z-index: 2;
//   @media (min-width: 1366px) and (max-width: 4000px) {
//     top: 44%;
//     right: 20px;
//   }
//   @media (min-width: 1200px) and (max-width: 1365px) {
//     top: 45%;
//     right: 20px;
//   }
//   @media (min-width: 992px) and (max-width: 1199px) {
//     top: 45%;
//     right: 30px;
//   }
//   @media (min-width: 768px) and (max-width: 991px) {
//     top: 44%;
//     right: 33px;
//   }
//   @media (min-width: 576px) and (max-width: 767px) {
//     top: 47%;
//     right: 30px;
//   }
//   @media (min-width: 320px) and (max-width: 575px) {
//     top: 47%;
//     right: 30px;
//   }
// `;

// const SyledDrawerBlock = styled.div`
//   bottom: 14%;
//   right: 0px;
//   background: rgb(4 4 4 / 40%);
//   opacity: 10;
//   position: absolute !important;
//   width: 109px;
//   height: 100%;
//   max-height: 67%;
//   z-index: 1;
//   border-top-left-radius: 10px;
//   border-bottom-left-radius: 10px;
//   display: flex;
//   align-items: flex-start;
//   justify-content: start;
//   padding: 4.2% 0;
//   @media (min-width: 1366px) and (max-width: 4000px) {
//     bottom: 13%;
//     max-height: 65%;
//   }
//   @media (min-width: 1200px) and (max-width: 1365px) {
//     bottom: 13%;
//     max-height: 65%;
//   }
//   @media (min-width: 992px) and (max-width: 1199px) {
//     bottom: 10%;
//     max-height: 70%;
//     width: 110px !important;
//   }
//   @media (min-width: 768px) and (max-width: 991px) {
//     bottom: 10%;
//     max-height: 71%;
//     width: 105px !important;
//   }
//   @media (min-width: 576px) and (max-width: 767px) {
//     bottom: 10%;
//     max-height: 68%;
//     width: 100px !important;
//   }
//   @media (min-width: 320px) and (max-width: 575px) {
//     bottom: 13%;
//     max-height: 65%;
//     width: 90px !important;
//   }

//   .home-inner-episode-carousal {
//     width: 600px;
//   }
// `;
// const SyledDrawerHeaderBox = styled.div`
//   width: 100%;

//   padding: 0px 25px 0px 0px;
//   display: flex !important;
//   align-items: center !important;
//   justify-content: space-between !important;
//   svg {
//     cursor: pointer;
//     position: absolute;
//     right: 6%;
//     top: 10%;
//     width: 15px;
//     height: 15px;
//     @media (min-width: 1366px) and (max-width: 4000px) {
//       right: 9%;
//     }
//     @media (min-width: 1200px) and (max-width: 1365px) {
//       right: 6%;
//     }
//     @media (min-width: 992px) and (max-width: 1199px) {
//       right: 6%;
//     }
//     @media (min-width: 768px) and (max-width: 991px) {
//     }
//     @media (min-width: 576px) and (max-width: 767px) {
//       right: 6%;
//     }
//     @media (min-width: 320px) and (max-width: 575px) {
//       right: 7%;
//     }
//   }
// `;
// const SyledDrawerHeaderTitle = styled.h6`
//   margin: 0 0;
//   font-family: 'Urbanist';
//   font-style: normal;
//   font-size: 20px;
//   font-weight: 400;
//   line-height: 30px;
// `;
// const SyledDrawerHeaderSubLabel = styled.label`
//   margin: 0 0;
//   font-family: 'Urbanist';
//   font-size: 16px;
//   font-weight: 400;
// `;
// const SyledDrawerContentWrapper = styled.div`
//   width: 100%;
//   .react-multi-carousel-item {
//     width: 345px;
//     margin-top: 20px;
//     @media (min-width: 1366px) and (max-width: 4000px) {
//       width: 330px !important;
//     }
//     @media (min-width: 1200px) and (max-width: 1365px) {
//       width: 300px !important;
//     }
//     @media (min-width: 992px) and (max-width: 1199px) {
//       width: 240px !important;
//     }
//     @media (min-width: 768px) and (max-width: 991px) {
//       width: 220px !important;
//     }
//     @media (min-width: 576px) and (max-width: 767px) {
//       width: 230px !important;
//     }
//     @media (min-width: 320px) and (max-width: 575px) {
//       width: 210px !important;
//     }
//   }
//   .MuiCardMedia-root {
//     height: 200px;
//   }
//   .r-arrow {
//     width: 90px;
//     z-index: 1;
//     position: fixed;
//     right: 2%;
//     @media (min-width: 1366px) and (max-width: 4000px) {
//       width: 19px !important;
//       right: 2%;
//     }
//     @media (min-width: 1200px) and (max-width: 1365px) {
//       width: 19px !important;
//       right: 2%;
//     }
//     @media (min-width: 992px) and (max-width: 1199px) {
//       width: 19px !important;
//       right: 2%;
//     }
//     @media (min-width: 768px) and (max-width: 991px) {
//       width: 19px;
//       right: 1%;
//     }
//     @media (min-width: 576px) and (max-width: 767px) {
//       width: 19px;
//       right: 1%;
//     }
//     @media (min-width: 320px) and (max-width: 575px) {
//       width: 19px;
//       right: 2%;
//     }
//   }
//   .l-arrow {
//     width: 90px;
//     z-index: 1;
//     position: fixed;
//     left: 34%;
//     @media (min-width: 1366px) and (max-width: 4000px) {
//       width: 22px;
//       left: 34%;
//     }
//     @media (min-width: 1200px) and (max-width: 1365px) {
//       width: 21px;
//       left: 34%;
//     }
//     @media (min-width: 992px) and (max-width: 1199px) {
//       width: 20px;
//       left: 35%;
//     }
//     @media (min-width: 768px) and (max-width: 991px) {
//       width: 17px;
//       left: 41%;
//     }
//     @media (min-width: 576px) and (max-width: 767px) {
//       width: 36px;
//       left: 43%;
//     }
//     @media (min-width: 320px) and (max-width: 575px) {
//       width: 39px;
//       left: 46%;
//     }
//   }
//   .react-multi-carousel-list {
//     margin-left: 10%;
//     margin-right: 10%;
//   }
// `;
// const Wrapper = styled.div`
//   background-color: #2a2727;
//   width: 100%;
//   height: 100vh;
//   ::-webkit-scrollbar {
//     width: 5px;
//     margin-left: 3px;
//   }
//   ::-webkit-scrollbar-track {
//     background: transparent !important;
//     border-radius: 10px;
//   }
//   ::-webkit-scrollbar-thumb {
//     width: 9px;
//     background: #201e1e !important;
//     border-radius: 10px;
//   }

//   .home-main-carousal {
//     button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium {
//       display: none !important;
//     }
//     div:nth-child(4) {
//       position: absolute;
//       left: 80px;
//       bottom: 16%;
//       display: flex !important;
//       z-index: 1;
//       text-align: start;
//       button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium {
//         display: block !important;
//       }
//     }
//   }
//   &.open-drawer {
//     .floating-drawer {
//       width: 67%;
//       -moz-transition: all 250ms linear;
//       -webkit-transition: all 250ms linear;
//       -o-transition: all 250ms linear;
//       transition: all 250ms linear;
//       @media (min-width: 992px) and (max-width: 1199px) {
//         width: 66% !important;
//       }
//       @media (min-width: 768px) and (max-width: 991px) {
//         width: 60% !important;
//       }
//       @media (min-width: 576px) and (max-width: 767px) {
//         width: 57% !important;
//       }
//       @media (min-width: 320px) and (max-width: 575px) {
//         width: calc(100% - 20px) !important;
//         background: rgb(19 20 18 / 90%) !important;
//       }
//     }
//   }
//   &.close-drawer {
//     .floating-drawer {
//       -moz-transition: all 200ms linear;
//       -webkit-transition: all 200ms linear;
//       -o-transition: all 200ms linear;
//       transition: all 200ms linear;
//     }
//   }
//   .react-multi-carousel-dot-list {
//     right: unset;
//     left: 82px;
//     top: 80%;
//   }
// `;
// const ImageBackground = styled.div`
//   background-size: cover !important;
//   background-position: center !important;
//   color: #ffffff !important;
//   width: 100%;
//   height: 100vh;
//   overflow: auto;
//   position: relative;
// `;
// const ContentWrapper = styled.div`
//   height: calc(100vh - 64px);
//   top: 64px;
//   position: relative;
//   display: flex;
//   align-items: center;
// `;
// const Content = styled.div`
//   margin-left: 81px;
//   width: 30%;
//   @media (min-width: 320px) and (max-width: 575px) {
//     margin-left: 30px;
//   }
//   .icon {
//     display: block;
//     margin-top: 20px;
//     @media (min-width: 1200px) and (max-width: 1365px) {
//       margin-top: 15px;
//     }
//     @media (min-width: 992px) and (max-width: 1199px) {
//       margin-top: 15px;
//     }
//     @media (min-width: 768px) and (max-width: 991px) {
//       margin-top: 10px;
//     }
//     @media (min-width: 576px) and (max-width: 767px) {
//       margin-top: 10px;
//     }
//     @media (min-width: 320px) and (max-width: 575px) {
//       margin-top: 5px;
//     }
//   }
//   .headingtitle {
//     margin-top: 80px;
//     margin-bottom: 10px;
//     @media (min-width: 320px) and (max-width: 575px) {
//       margin-top: 20px;
//     }
//   }
//   .mylist {
//     margin-bottom: 20px;
//     @media (min-width: 576px) and (max-width: 767px) {
//       margin-bottom: 15px;
//     }
//     @media (min-width: 320px) and (max-width: 575px) {
//       margin-bottom: 10px;
//     }
//   }
// `;
// const Drawerlabel = styled.div`
//   padding-top: 11px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   @media (min-width: 576px) and (max-width: 767px) {
//     justify-content: unset;
//     gap: 10px;
//   }
//   @media (min-width: 320px) and (max-width: 575px) {
//     justify-content: unset;
//     gap: 10px;
//   }
//   .group-label {
//     display: flex;
//     align-items: center;
//   }
//   .season {
//     margin-right: 15px;
//     margin-left: 6px;
//     @media (min-width: 576px) and (max-width: 767px) {
//       margin-right: 10px;
//     }
//     @media (min-width: 320px) and (max-width: 575px) {
//       margin-right: 10px;
//     }
//   }
// `;
// const RecommendedWrapper = styled.div`
//   .recomended-label {
//     padding: 0px 78px;
//     margin: 15px 0px;
//     width: 100%;
//     align-items: center;
//     justify-content: center;
//     @media (min-width: 320px) and (max-width: 766px) {
//       padding: 0px;
//       display: flex;
//       justify-content: center;
//     }
//   }
//   .hot {
//     font-style: italic;
//     font-family: 'Urbanist';
//     font-weight: 700;
//     font-size: 20px;
//     color: #f4793b;
//     padding-left: 5px;
//   }
//   .recommended {
//     width: unset !important;
//   }
// `;
// const StyledHomeSectionWrapper = styled(HomeSectionWrapper)`
//   .react-multi-carousel-item {
//     width: fit-content !important;
//     // margin-right: 2.5% !important;
//   }
// `;
// export default HomePage;

import React from 'react';

const index = () => {
  return <div>index</div>;
};

export default index;
