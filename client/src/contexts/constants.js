export const apiUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8081/api' : 'link deploy'
export const LOCAL_STORAGE_TOKEN_NAME = 'user-token'
export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS'
export const POSTS_LOADED_FAIL = 'POSTS_LOADED_FAIL'
export const POST_ADDED_SUCCESS = 'POST_ADDED_SUCCESS'
export const USER_ROLE = 'USER_ROLE'








export const JOBFIELD = [
    { label: "Business Development", value: 'businessdevelopment' },
    { label: "Aviation", value: 'aviation' },
    { label: "Banking", value: 'banking' },
    { label: "Bublic Relations", value: 'publicrelations' },
    { label: "Chef", value: 'chef' },
    { label: "Teacher", value: 9 },
    { label: "Accountant", value: 10 },
    { label: "Consultant", value: 11 },
    { label: "Digitalmedia", value: 12 },
    { label: "Apparel", value: 13 },
    { label: "Java Developer", value: 14 },
    { label: "Construction", value: 15 },
    { label: "Testing", value: 16 },
    { label: "Finance", value: 17 },
    { label: "Agriculture", value: 18 },
    { label: "Devops Engineer", value: 19 },
    { label: "Python Developer", value: 20 },
    { label: "Web Designing", value: 21 },
    { label: "HR", value: 22 },
    { label: "Hadoop", value: 23 },
    { label: "Blockchain", value: 24 },
    { label: "Mechanical Engineer", value: 25 },
    { label: "Sales", value: 26 },
    { label: "Etl Developer", value: 27 },
    { label: "Operations Manager", value: 28 },
    { label: "Data Science", value: 29 },
    { label: "Arts", value: 30 },
    { label: "Automobile", value: 31 },
    { label: "Database", value: 32 },
    { label: "Health and Fitness", value: 33 },
    { label: "PMO", value: 34 },
    { label: "Electrical Engineering", value: 35 },
    { label: "Dot Net Developer", value: 36 },
    { label: "Business Analyst", value: 37 },
    { label: "Automation Testing", value: 38 },
    { label: "Network Security Engineer", value: 39 },
    { label: "Civil Engineer", value: 40 },
    { label: "SAP Developer", value: 41 },
    { label: "BPO", value: 42 },
    { label: "Advocate", value: 43 },
    { label: "Engineering", value: 44 },   
  ]; 


  export const CITYLOCATION = [
    { value: "an-giang", label: 'An Giang' },
    { value: "ba-ria-vung-tau", label: 'Bà Rịa – Vũng Tàu' },
    { value: "bac-giang", label: 'Bắc Giang' },
    { value: "bac-kan", label: 'Bắc Kạn' },
    { value: "bac-lieu", label: 'Bạc Liêu' },
    { value: "bac-ninh", label: 'Bắc Ninh' },
    { value: "ben-tre", label: 'Ben Tre' },
    { value: "binh-dinh", label: 'Binh Dinh' },
    { value: "binh-duong", label: 'Binh Duong' },
    { value: "binh-phuoc", label: 'Binh Phuoc' },
    { value: "binh-thuan", label: 'Binh Thuan' },
    { value: "ca-mau", label: 'Ca Mau' },
    { value: "can-tho", label: 'Can Tho' },
    { value: "cao-bang", label: 'Cao Bang' },
    { value: "da-nang", label: 'Da Nang' },
    { value: "dak-lak", label: 'Dak Lak' },
    { value: "dak-nong", label: 'Dak Nong' },
    { value: "dien-bien", label: 'Dien Bien' },
    { value: "dong-nai", label: 'Dong Nai' },
    { value: "dong-thap", label: 'Dong Thap' },
    { value: "gia-lai", label: 'Gia Lai' },
    { value: "ha-giang", label: 'Ha Giang' },
    { value: "ha-nam", label: 'Ha Nam' },
    { value: "ha-noi", label: 'Ha Noi' },
    { value: "ha-tinh", label: 'Ha Tinh' },
    { value: "hai-duong", label: 'Hai Duong' },
    { value: "hai-phong", label: 'Hai Phong' },
    { value: "hau-giang", label: 'Hau Giang' },
    { value: "hoa-binh", label: 'Hoa Binh' },
    { value: "hung-yen", label: 'Hung Yen' },
    { value: "khanh-hoa", label: 'Khanh Hoa' },
    { value: "kien-giang", label: 'Kien Giang' },
    { value: "kon-tum", label: 'Kon Tum' },
    { value: "lai-chau", label: 'Lai Chau' },
    { value: "lam-dong", label: 'Lam Dong' },
    { value: "lang-son", label: 'Lang Son' },
    { value: "lao-cai", label: 'Lao Cai' },
    { value: "long-an", label: 'Long An' },
    { value: "nam-dinh", label: 'Nam Dinh' },
    { value: "nghe-an", label: 'Nghe An' },
    { value: "ninh-binh", label: 'Ninh Binh' },
    { value: "ninh-thuan", label: 'Ninh Thuan' },  
    { value: "phu-tho", label: 'Phu Tho' },  
    { value: "phu-yen", label: 'Phu Yen' },  
    { value: "quang-binh", label: 'Quang Binh' },  
    { value: "quang-nam", label: 'Quang Nam' },  
    { value: "quang-ngai", label: 'Quang Ngai' },     
    { value: "quang-ninh", label: 'Quang Ninh' },  
    { value: "quang-tri", label: 'Quang Tri' },  
    { value: "soc-trang", label: 'Soc Trang' },  
    { value: "son-la", label: 'Son La' },  
    { value: "tay-ninh", label: 'Tay Ninh' },  
    { value: "thai-binh", label: 'Thai Binh' },  
    { value: "thai-nguyen", label: 'Thai Nguyen' },  
    { value: "thanh-hoa", label: 'Thanh Hoa' },  
    { value: "thua-thien-hue", label: 'Thua Thien Hue' },  
    { value: "tien-giang", label: 'Tien Giang' },
    { value: "ho-chi-minh", label: 'Thanh Pho Ho Chi Minh' },  
    { value: "tra-vinh", label: 'Tra Vinh' }, 
    { value: "tuyen-quang", label: 'Tuyen Quang' }, 
    { value: "vinh-long", label: 'Vinh Long' }, 
    { value: "vinh-phuc", label: 'Vinh Phuc' }, 
    { value: "yen-bai", label: 'Yen Bai' }, 
  ];