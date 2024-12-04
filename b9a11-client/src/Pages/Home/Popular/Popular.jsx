import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PopularCard from './PopularCard';

import useAllService from '../../../hook/useAllService';
const Popular = () => {
    const services = useAllService() || {};
    // console.log("services", services)
    return (
        <div className='my-10'>
            <Tabs>
                <TabList>
                    <Tab >Math Tutoring</Tab>
                    <Tab>English Tutoring</Tab>
                    <Tab>Bangla Tutoring</Tab>
                </TabList>

                <TabPanel>
                    <div className='grid grid-cols-2 gap-10 my-10'>
                        {
                            services.filter(p => p.category === 'Math Tutoring').map(popular => <PopularCard key={popular._id} popular={popular} />
                                )
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-2 gap-10 '>
                        {
                            services.filter(p => p.category === 'English Tutoring').map(popular => <PopularCard key={popular._id} popular={popular} />
                                )
                        }
                    </div>
                </TabPanel>
                <TabPanel>

                    <div className='grid grid-cols-2 gap-10'>
                        {
                            services.filter(p => p.category === 'Bangla Tutoring').map(popular => <PopularCard key={popular._id} popular={popular} />
                                )
                        }
                    </div>

                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Popular;