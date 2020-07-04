
import { observable, computed, action } from "mobx";
import { Stores } from "../setupContext";
import { IUser, IImage, EMOTIONS } from "../model/models"
import { K_Means } from '@softnami/kmeans';
const axios = require('axios');


export class ImageStore {
    public rootStore!: Stores;
    @observable users: IUser[] = [];
    @observable userImages: IImage[] = [];
    @observable sexFilter: string = 'all';
    @observable ageFilter: number = 100;
    @observable itemsFilter: number = 100;

    @observable clusterData: any;
    @observable imageClusterKeyMap: IImage[] = [];
    @observable clustersImages: Array<Array<IImage>> = [];

    @observable selectedImageId: string | undefined;
    @observable countryFilter: string = 'Any';

    @action setSelectetImage(id: string) {
        this.selectedImageId = id;
    }
    @action getUsers() {
        axios.get('http://127.0.0.1:5000/api/v1/resources/users/all')
            .then((response: any) => {
                if (response.data && response.data.length > 0) {
                    this.users = response.data.map((i: string) => JSON.parse(i));
                }
            })
            .catch(function (error: any) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

    }

    @action getUserImages(userId: string) {
        axios.get(
            'http://127.0.0.1:5000/api/v1/resources/images',
            {
                params: {
                    id: userId
                }
            })
            .then((response: any) => {
                if (response.data && response.data.length > 0) {
                    this.userImages = response.data.map((i: string) => JSON.parse(i));
                    this.userImages = this.userImages.map(i => { i.color = this.getFillColor(); return i; })
                }
            })
            .catch(function (error: any) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    @action getAllImages() {
        axios.get(
            'http://127.0.0.1:5000/api/v1/resources/images/all')
            .then((response: any) => {
                if (response.data && response.data.length > 0) {
                    this.userImages = response.data.map((i: string) => JSON.parse(i));
                    this.userImages = this.userImages.map(i => { i.color = this.getFillColor(); return i; })

                    // Hack. TODO: replace with reactive solution
                    setTimeout(() => {
                        this.generateClusterData();
                    }, 300);
                    setTimeout(() => {
                        this.imagesByCluster()
                    }, 2300);
                }
            })
            .catch(function (error: any) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    @action setSexFilter(v: string) {
        this.sexFilter = v;
    }

    @action setAgeFilter(v: number) {
        this.ageFilter = v;
    }

    @action itemsAgeFilter(v: number) {
        this.itemsFilter = v;
    }

    @action setCountryFilter(v: string) {
        this.countryFilter = v;
    }

    @computed get filteredImages() {
        return this.userImages.filter(img => {
            const ret =
                (this.sexFilter === "all" ? true : img.sex === this.sexFilter) &&
                (img.age < this.ageFilter) &&
                (this.countryFilter === "Any" || img.country === this.countryFilter)
            return ret;
        }).slice(0, this.itemsFilter);
    }

    @computed get countries(): any {
        return [...(new Set<string>(this.userImages.map(i => i.country)))];
    }

    /***
     * Structure: { subject: 'Emotion', image1: 120, image2: 110.... }
     */
    @computed get emotionsRadarStruct() {
        const radarDataObj: any = {};
        const radarDataArr: any[] = [];
        let curImage: IImage;
        // let curEmotion: any = {};
        this.filteredImages.map((img: IImage) => {
            curImage = img;
            img.emotions.replace(/\s[1, ]/g, " ").replace(/\[|\s\]|\]/g, '').split(' ')
                .map((e, i) => {
                    radarDataObj[EMOTIONS[i]] = radarDataObj[EMOTIONS[i]] || {};
                    radarDataObj[EMOTIONS[i]] = Object.assign(radarDataObj[EMOTIONS[i]], { [curImage.id]: Number(e) * 150 });
                    return null;
                })
            return null;
        });

        Object.keys(radarDataObj).map(k => {
            radarDataArr.push(Object.assign(radarDataObj[k as any], { emotion: k }));
            return null;
        });

        console.log('DATA', radarDataObj);

        return radarDataArr;
    }


    private imagesByCluster() {

        this.clusterData[0].clusters.map((cluster, i) => {
            this.clustersImages[i] = this.clustersImages[i] || [];
            this.clustersImages[i] = cluster.map(e => this.imageClusterKeyMap[e.join('')]);
        })

    }
    public init(rootStore: Stores) {
        this.rootStore = rootStore;
        this.getUsers();
        return this;
    }

    private getFillColor = () => {
        return ("#" + Math.floor(Math.random() * 16777215).toString(16));
    }

    private generateClusterData() {
        const data: any[] = [];

        this.userImages.map((img: IImage, j) => {
            img.emotions.replace(/\s[1, ]/g, " ").replace(/\[|\s\]|\]/g, '').split(' ')
                .map((e: string, i) => {
                    data[j] = data[j] || [];
                    (data[j] as Array<number>).push(Number(e));
                })
            this.imageClusterKeyMap[img.emotions.replace(/\s[1, ]/g, " ").replace(/\[|\s\]|\]|\s/g, '')] = img;
        })

        console.log('THIS IS THE DATA', data, this.imageClusterKeyMap);

        // return data;

        const kMeans = new K_Means({
            random_Init_Count: 4, //number of times to initialize random centroids
            cluster_count: 2, //number of clusters needed
            max_iterations: 1000, //maximum iterations to run clustering
            iteration_callback: () => { console.log("debugInfo"); }, //debug callback
            notify_count: 10 //execute callback after every 10 iterations
        });

        //start clustering
        kMeans.start_Clustering(data).then((clusters) => {

            this.clusterData = clusters;
        });

    }
}