import { Image, Row, Col, Input, Button, List, Space, Card, Divider, Tag } from "antd";
import { SearchOutlined, EnvironmentFilled, TeamOutlined } from "@ant-design/icons";
import React from "react";
import { AxiosResponse } from "axios";
import { getMyLearningPagination } from "../../repository/MyLearningRepository";
// import { dataList } from "../../components/data/dataList";
import Search from "antd/lib/input/Search";

interface MyLearningProps {}
interface MyLearningState {
	data: any[];
	pagination: {
		page: number;
		total: number;
	};
	param: {
		page: number;
		size: number;
		applied: number;
		bookmark: number;
		completed: number;
		onProgress: number;
		searchC: string;
		all: number;
	};
	selectedTags: any[];
}

const { CheckableTag } = Tag;

const tagsData = ["All", "Applied", "OnProgress", "Completed", "Bookmark"];

class MyLearning extends React.Component<MyLearningProps, MyLearningState> {
	typeColor(class_type: string) {
		if (class_type == "training") {
			return "palegreen";
		} else if (class_type == "workshop") {
			return "#1890ff";
		} else {
			return "white";
		}
	}

	typeTextColor(class_type: string) {
		if (class_type == "training") {
			return "black";
		} else if (class_type == "workshop") {
			return "white";
		} else {
			return "black";
		}
	}

	handleChange(tag: any, checked: boolean) {
		const { selectedTags } = this.state;
		const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
		console.log("Status dipilih: ", nextSelectedTags);
		this.setState({ selectedTags: nextSelectedTags });
	}

	onClickB(e: string) {
		console.log(e);
		if (e === "Applied") {
			console.log("Masuk");

			this.setState(
				{
					param: {
						page: this.state.param.page,
						size: this.state.param.size,
						applied: this.state.param.applied == 1 ? 0 : 1,
						bookmark: this.state.param.bookmark,
						completed: this.state.param.completed,
						onProgress: this.state.param.onProgress,
						searchC: this.state.param.searchC,
						all: this.state.param.all,
					},
				},
				() => {
					this.getData();
				}
			);
		} else if (e === "Bookmark") {
			this.setState(
				{
					param: {
						page: this.state.param.page,
						size: this.state.param.size,
						applied: this.state.param.applied,
						bookmark: this.state.param.bookmark == 1 ? 0 : 1,
						completed: this.state.param.completed,
						onProgress: this.state.param.onProgress,
						searchC: this.state.param.searchC,
						all: this.state.param.all,
					},
				},
				() => {
					this.getData();
				}
			);
		} else if (e === "OnProgress") {
			this.setState(
				{
					param: {
						page: this.state.param.page,
						size: this.state.param.size,
						applied: this.state.param.applied,
						bookmark: this.state.param.bookmark,
						completed: this.state.param.completed,
						searchC: this.state.param.searchC,
						all: this.state.param.all,
						onProgress: this.state.param.onProgress == 1 ? 0 : 1,
					},
				},
				() => {
					this.getData();
				}
			);
		} else if (e === "Completed") {
			this.setState(
				{
					param: {
						page: this.state.param.page,
						size: this.state.param.size,
						applied: this.state.param.applied,
						bookmark: this.state.param.bookmark,
						onProgress: this.state.param.onProgress,
						searchC: this.state.param.searchC,
						all: this.state.param.all,
						completed: this.state.param.completed == 1 ? 0 : 1,
					},
				},
				() => {
					this.getData();
				}
			);
		} else if (e === "All") {
			this.setState(
				{
					param: {
						page: this.state.param.page,
						size: this.state.param.size,
						applied: this.state.param.applied,
						bookmark: this.state.param.bookmark,
						completed: this.state.param.completed,
						onProgress: this.state.param.onProgress,
						searchC: this.state.param.searchC,
						all: this.state.param.all == 1 ? 0 : 1,
					},
				},
				() => {
					this.getData();
				}
			);
		} else {
		}
	}

	state = {
		data: [],
		pagination: {
			page: 1,
			total: 0,
		},
		param: {
			page: 1,
			size: 100,
			applied: 0,
			bookmark: 0,
			completed: 0,
			onProgress: 0,
			searchC: "",
			all: 0,
		},
		selectedTags: [""],
	};

	componentDidMount() {
		this.getData();
	}

	colorB(stat: string) {
		if (stat === "workshop") {
			return "green";
		} else {
			return "#08c";
		}
	}

	// getData() {
	//     getMyLearningPagination().then((res: AxiosResponse<any>) => {
	//         this.setState({
	//             data: res.data.data,
	//             pagination: {
	//                 page: res.data.page,
	//                 total: res.data.total,
	//             },
	//         });
	//         console.log(res);
	//         console.log(this.state.data);
	//     });
	// }

	getData() {
		getMyLearningPagination(this.state.param)
			.then((res: AxiosResponse<any>) => {
				this.setState({
					data: res.data.content,
					pagination: {
						page: res.data.page,
						total: res.data.total,
					},
				});
				console.log(this.state.data);
			})
			.catch((error: any) => {
				console.log(error);
				console.log("Masuk Gagal");
			});
	}

	render() {
		const { selectedTags } = this.state;
		return (
			<>
				<div>
					<Row>
						<Col span={24}>
							<Row justify="space-between">
								<Col>
									<h3>My Learning</h3>
								</Col>
								<Col>
									{/* <Space>
                                        <Input className="searchBox" placeholder="Masukkan kata kunci" suffix={<SearchOutlined />} allowClear />
                                        <Button className="searchButton" type="primary">Search Class</Button>
                                    </Space> */}
									<Space>
										<Search
											className="searchBox"
											placeholder="Masukkan kata kunci"
											allowClear
											onSearch={() => {
												console.log("klik ini");
												this.getData();
											}}
											onChange={(e: any) => {
												this.setState({
													param: {
														page: 1,
														size: 100,
														applied: 0,
														bookmark: 0,
														completed: 0,
														onProgress: 0,
														all: 0,
														searchC: e.target.value,
													},
												});
											}}
										/>
										<Button
											className="searchButton"
											style={{ borderRadius: "5px" }}
											onClick={() => {
												console.log("klik ini");
												this.getData();
											}}
											type="primary"
										>
											Search Class
										</Button>
									</Space>
								</Col>
							</Row>
							<Divider />
							<Row>
								<div className="buttonFilter">
									{tagsData.map((tag) => (
										<CheckableTag key={tag} checked={selectedTags.indexOf(tag) > -1} onChange={(checked) => this.handleChange(tag, checked)} onClick={() => this.onClickB(tag)}>
											{tag}
										</CheckableTag>
									))}
								</div>
							</Row>
							<Row>
								<List
									style={{ width: "100%" }}
									itemLayout="horizontal"
									// dataSource={dataList}
									dataSource={this.state.data}
									// pagination={{
									//     onChange: (e) => {
									//         console.log(e);
									//     },
									//     defaultCurrent: 1,
									//     pageSize: 3,
									// }}
									pagination={{
										onChange: (e) => {
											console.log(e);
										},
										defaultCurrent: 1,
										pageSize: 5,
										position: "bottom",
										responsive: true,
									}}
									renderItem={(item: any) => (
										<List.Item>
											<Card className="cardContainer">
												<Row gutter={[20, 0]}>
													<Col span={4}>
														<Image className="imagePreview" preview={false} src={item.image} />
													</Col>
													<Col span={20}>
														<Row justify="space-between">
															<Col>
																<Space>
																	<Tag className="class_typeTag" style={{ backgroundColor: this.typeColor(item.class_type), color: this.typeTextColor(item.class_type) }}>
																		{item.class_type}
																	</Tag>
																	<h2>{item.class_title}</h2>
																</Space>
															</Col>
															<Col>
																<TeamOutlined /> {item.participant_count} participant
															</Col>
														</Row>
														<Divider />
														<Row justify="space-between">
															<Col>
																<Row gutter={10}>
																	<Col>
																		Applied On
																		<br />
																		Posted On
																		<br />
																		Will Start On
																		<br />
																		Access Link
																	</Col>
																	<Col>
																		:
																		<br />
																		:
																		<br />
																		:
																		<br />:
																	</Col>
																	<Col>
																		{item.applied_on}
																		<br />
																		{item.posted_on}
																		<br />
																		{item.will_start_on}
																		<br />
																		<a href={item.access_link}>{item.access_link}</a>
																	</Col>
																</Row>
															</Col>
															<Col>
																<Tag>{item.status}</Tag>
															</Col>
														</Row>
													</Col>
												</Row>
											</Card>
										</List.Item>
									)}
								/>
							</Row>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

export default MyLearning;
