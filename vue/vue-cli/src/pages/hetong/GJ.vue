<template>
  <div style="background: #fff;">
    <div class="ht">
      <p class="mtb15"><strong>GF-2014-2401</strong></p>
      <p class="title first-title"><strong>团队出境旅游合同</strong></p>
      <p class="title first-title"><strong>（示范文本）</strong></p>
      <p class="title first-title">国家旅游局、国家工商行政管理总局制定</p>
      <p class="title first-title">二〇一四年四月</p>
      <p class="title first-title"><strong>使用说明</strong></p>
      <p class="first-space">
        1、本合同为示范文本，供中华人民共和国境内（不含港、澳、台地区）经营出境旅游业务或者边境旅游业务的旅行社（以下简称“出境社”）与出境旅游者（以下简称“旅游者”）之间签订团队出境包价旅游（不含赴台湾地区旅游）合同时使用。</p>
      <p class="first-space">2、双方当事人应当结合具体情况选择本合同协议条款中所提供的选择项，空格处应当以文字形式填写完整。</p>
      <p class="first-space">3、双方当事人可以书面形式对本示范文本内容进行变更或者补充，但变更或者补充的内容，不得减轻或者免除应当由出境社承担的责任。</p>
      <p class="first-space">4、本示范文本由国家旅游局和国家工商行政管理总局共同制定、解释，在全国范围内推行使用。</p>
      <p class="title first-title">
        <strong>团队出境旅游合同</strong>
        <em class="red blod" v-if="allInfo.IsZuoFei" style="color:red;">(已作废)</em>
      </p>
      <p class="mtb15" style="text-align: center;" v-if="allInfo.upload.Has"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合同编号：<u>{{allInfo.upload.Code}}</u></strong>
      </p>
      <p style="text-align: center;" v-if="allInfo.upload.Has"><img style="width:80px;height:80px"
                                                                    :src="'data:image/png;base64,'+ allInfo.upload.QrCode"/>
      </p>
      <p class="mtb15" style="text-align: center;" v-if="!allInfo.upload.Has"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合同编号：<u>@{{allInfo.upload.Code}}</u></strong>
      </p>
      <p class="first-space">旅游者：<span class="qm-line time">{{allInfo.KeHu_Name}}</span>等<span class="qm-line time">{{allInfo.KeHu_Num}}</span>人（名单可附页，需出境社和旅游者代表签字盖章确认）；
      </p>
      <p class="first-space">出境社：<span class="qm-line time">{{allInfo.ZhangName}}</span>；</p>
      <p class="first-space">旅行社业务经营许可证编号：<span class="qm-line time">{{allInfo.XuKeZheng}}</span>。</p>
      <p class="first-space badge">第一章：术语和定义</p>
      <p class="first-space">第一条：本合同术语和定义</p>
      <p class="second-space">
        1、团队出境旅游服务，指出境社依据《中华人民共和国旅游法》、《中国公民出国旅游管理办法》和《旅行社条例》等法律、法规，组织旅游者出国旅游及赴中外双方政府商定的国外边境区域和港、澳地区等旅游目的地旅游，代办旅游签证／签注，代订公共交通客票，提供餐饮、住宿、游览等两项以上服务活动。</p>
      <p class="second-space">2、旅游费用，指旅游者支付给出境社，用于购买本合同约定的旅游服务的费用。</p>
      <p class="second-space">旅游费用包括：</p>
      <p class="three-space">(1)必要的签证/签注费用（旅游者自办的除外）；</p>
      <p class="three-space">(2)交通费（含境外机场税）；</p>
      <p class="three-space">(3)住宿费；</p>
      <p class="three-space">(4)餐费（不含酒水费）；</p>
      <p class="three-space">(5)出境社统一安排的景区景点的门票费；</p>
      <p class="three-space">(6)行程中安排的其他项目费用；</p>
      <p class="three-space">(7)导游服务费；</p>
      <p class="three-space">(8)边境旅游中办理旅游证件的费用；</p>
      <p class="three-space">(9)出境社、境外地接社等其他服务费用。</p>
      <p class="second-space">旅游费用不包括：</p>
      <p class="three-space">(1)办理护照、港澳通行证的费用；</p>
      <p class="three-space">(2)办理离团的费用；</p>
      <p class="three-space">(3)旅游者投保的人身意外伤害保险费用；</p>
      <p class="three-space">(4)合同未约定由出境社支付的费用，包括但不限于行程以外非合同约定项目所需的费用、自行安排活动期间发生的费用; </p>
      <p class="three-space">(5)境外小费; </p>
      <p class="three-space">(6)行程中发生的旅游者个人费用，包括但不限于交通工具上的非免费餐饮费、行李超重费，住宿期间的洗衣、通讯
        、饮料及酒类费用，个人娱乐费用，个人伤病医疗费，寻找个人遗失物品的费用及报酬，个人原因造成的赔偿费用。 </p>
      <p class="second-space">3、履行辅助人，指与旅行社存在合同关系，协助其履行本合同义务，实际提供相关服务的法人、自然人或者其他组织。</p>
      <p class="second-space">4、自由活动，特指《旅游行程单》中安排的自由活动。</p>
      <p class="second-space">
        5、自行安排活动期间，指《旅游行程单》中安排的自由活动期间、旅游者不参加旅游行程活动期间、每日行程开始前、结束后旅游者离开住宿设施的个人活动期间、旅游者经领队或者导游同意暂时离团的个人活动期间。</p>
      <p class="second-space">
        6、不合理的低价，指出境社提供服务的价格低于接待和服务费用或者低于行业公认的合理价格，且无正当理由和充分证据证明该价格的合理性。其中，接待和服务费用主要包括出境社提供或者采购餐饮、住宿、交通、游览、导游或者领队等服务所支出的费用。</p>
      <p class="second-space">
        7、具体购物场所，指购物场所有独立的商号以及相对清晰、封闭、独立的经营边界和明确的经营主体，包括免税店，大型购物商场，前店后厂的购物场所，景区内购物场所，景区周边或者通往景区途中的购物场所，服务旅游团队的专门商店，商品批发市场和与餐饮、娱乐、停车休息等相关联的购物场所等。</p>
      <p class="second-space">
        8、旅游者投保的人身意外伤害保险，指旅游者自己购买或者通过旅行社、航空机票代理点、景区等保险代理机构购买的以旅行期间自身的生命、身体或者有关利益为保险标的的短期保险，包括但不限于航空意外险、旅游意外险、紧急救援保险、特殊项目意外险。</p>
      <p class="second-space">9、离团，指团队旅游者在境外经领队同意不随团队完成约定行程的行为。</p>
      <p class="second-space">10、脱团，指团队旅游者在境外未经领队同意脱离旅游团队，不随团队完成约定行程的行为。</p>
      <p class="second-space">11、转团，指由于未达到约定成团人数不能出团，出境社征得旅游者书面同意，在行程开始前将旅游者转至其他出境社所组的出境旅游团队履行合同的行为。</p>
      <p class="second-space">12、拼团，指出境社在保证所承诺的服务内容和标准不变的前提下，在签订合同时经旅游者同意，与其他出境社招徕的旅游者拼成一个团统一安排旅游服务的行为。</p>
      <p class="second-space">13、不可抗力，指不能预见、不能避免并不能克服的客观情况，包括但不限于因自然原因和社会原因引起的，如自然灾害、战争、恐怖活动、动乱、骚乱、罢工、突发公共卫生事件、政府行为。</p>
      <p class="second-space">
        14、已尽合理注意义务仍不能避免的事件，指因当事人故意或者过失以外的客观因素引发的事件，包括但不限于重大礼宾活动导致的交通堵塞，飞机、火车、班轮、城际客运班车等公共客运交通工具延误或者取消，景点临时不开放。</p>
      <p class="second-space">15、必要的费用，指出境社履行合同已经发生的费用以及向地接社或者履行辅助人支付且不可退还的费用,
        包括乘坐飞机（车、船）等交通工具的费用（含预订金）、旅游签证/签注费用、饭店住宿费用（含预订金）、旅游观光汽车的人均车租等。</p>
      <p class="second-space">16、公共交通经营者，指航空、铁路、航运客轮、城市公交、地铁等公共交通工具经营者。</p>
      <p class="first-space badge">第二章：合同的订立</p>
      <p class="first-space">第二条：旅游行程单</p>
      <p class="second-space">出境社应当提供带团号的《旅游行程单》（以下简称《行程单》），经双方签字或者盖章确认后作为本合同的组成部分。《行程单》应当对如下内容作出明确的说明：</p>
      <p class="three-space">（1）旅游行程的出发地、途经地、目的地、结束地，线路行程时间（按自然日计算，含乘飞机、车、船等在途时间，不足24小时以一日计）；</p>
      <p class="three-space">（2）旅游目的地地接社的名称、地址、联系人和联系电话；</p>
      <p class="three-space">（3）交通服务安排及其标准（明确交通工具及档次等级、出发时间以及是否需中转等信息）；</p>
      <p class="three-space">（4）住宿服务安排及其标准（明确住宿饭店的名称、地址、档次等级及是否有空调、热水等相关服务设施）；</p>
      <p class="three-space">（5）用餐（早餐和正餐）服务安排及其标准（明确用餐次数、地点、标准）；</p>
      <p class="three-space">（6）出境社统一安排的游览项目的具体内容及时间（明确旅游线路内容包括景区点及游览项目名称、景区点停留的最少时间）；</p>
      <p class="three-space">（7）自由活动的时间；</p>
      <p class="three-space">（8）行程安排的娱乐活动（明确娱乐活动的时间、地点和项目内容）；</p>
      <p class="second-space">《行程单》用语须准确清晰，在表明服务标准用语中不应当出现“准×星级”、“豪华”、“仅供参考”、“以××为准”、“与××同级”等不确定用语。</p>
      <p class="first-space">第三条：订立合同</p>
      <p class="second-space">旅游者应当认真阅读本合同条款和《行程单》，在旅游者理解本合同条款及有关附件后，出境社和旅游者应当签订书面合同。</p>
      <p class="second-space">由旅游者的代理人订立合同的，代理人需要出具被代理的旅游者的授权委托书。</p>
      <p class="first-space">第四条：旅游广告及宣传品</p>
      <p class="second-space">出境社的旅游广告及宣传品应当遵循诚实信用的原则，其内容符合《中华人民共和国合同法》要约规定的，视为本合同的组成部分，对出境社和旅游者双方具有约束力。</p>
      <p class="first-space badge">第三章：合同双方的权利义务</p>
      <p class="first-space">第五条：出境社的权利</p>
      <p class="second-space">1、根据旅游者的身体健康状况及相关条件决定是否接纳旅游者报名参团；</p>
      <p class="second-space">2、核实旅游者提供的相关信息资料；</p>
      <p class="second-space">3、按照合同约定向旅游者收取全额旅游费用；</p>
      <p class="second-space">4、旅游团队遇紧急情况时，可以采取安全防范措施和紧急避险措施并要求旅游者配合；</p>
      <p class="second-space">5、拒绝旅游者提出的超出合同约定的不合理要求；</p>
      <p class="second-space">6、要求旅游者对在旅游活动中或者在解决纠纷时损害出境社合法权益的行为承担赔偿责任；</p>
      <p class="second-space">7、要求旅游者健康、文明旅游，劝阻旅游者违法和违反社会公德的行为。</p>
      <p class="first-space">第六条：出境社的义务</p>
      <p class="second-space">1、按照合同和《行程单》约定的内容和标准为旅游者提供服务，不擅自变更旅游行程安排，不降低服务标准；</p>
      <p class="second-space">2、向合格的供应商订购产品和服务；</p>
      <p class="second-space">3、不以不合理的低价组织旅游活动，诱骗旅游者，并通过安排购物或者另行付费旅游项目获取回扣等不正当利益；</p>
      <p class="second-space">组织、接待旅游者，不指定具体购物场所，不安排另行付费旅游项目，但是，经双方协商一致或者旅游者要求，且不影响其他旅游者行程安排的除外；</p>
      <p class="second-space">
        4、在出团前采取行前说明会等方式，如实告知具体行程安排和有关具体事项。具体事项包括但不限于旅游目的地国家或者地区的相关法律、法规和风俗习惯、文化传统和宗教禁忌；旅游活动中的安全注意事项和安全避险措施、旅游者不适合参加旅游活动的情形；出境社依法可以减免责任的信息；境外小费标准、外汇兑换事项、应急联络方式（包括我驻外使领馆及出境社境内和境外应急联系人及联系方式）；法律、法规规定的其他应当告知的事项；</p>
      <p class="second-space">5、为旅游团队安排符合《中华人民共和国旅游法》、《旅行社条例》、《中国公民出国旅游管理办法》等法律、法规规定的持证领队人员；</p>
      <p class="second-space">6、妥善保管旅游者交其代管的证件、行李等物品；</p>
      <p class="second-space">7、为旅游者发放用中英文固定格式书写、由旅游者填写的安全信息卡（内容包括旅游者的姓名、国籍、血型、应急联络方式等）；</p>
      <p class="second-space">8、旅游者人身、财产权益受到损害时，应采取合理必要的保护和救助措施，避免旅游者人身、财产权益损失扩大；</p>
      <p class="second-space">9、积极协调处理旅游行程中的纠纷，采取适当措施防止损失扩大；</p>
      <p class="second-space">10、提示旅游者按照规定投保人身意外伤害保险；</p>
      <p class="second-space">11、向旅游者提供发票；</p>
      <p class="second-space">12、依法对旅游者个人信息保密；</p>
      <p class="first-space">第七条：旅游者的权利</p>
      <p class="second-space">1、要求出境社按照合同及《行程单》约定履行相关义务；</p>
      <p class="second-space">2、拒绝出境社未经事先协商一致的转团、拼团行为；</p>
      <p class="second-space">
        3、有权自主选择旅游产品和服务，有权拒绝出境社未与旅游者协商一致或者未经旅游者要求而指定购物场所、安排旅游者参加另行付费旅游项目的行为，有权拒绝出境社的导游、领队强迫或者变相强迫旅游者购物、参加另行付费旅游项目的行为；</p>
      <p class="second-space">4、在支付旅游费用时要求出境社出具发票；</p>
      <p class="second-space">5、人格尊严、民族风俗习惯和宗教信仰得到尊重；</p>
      <p class="second-space">6、在人身、财产安全遇有危险时，有权请求救助和保护；人身、财产受到侵害的，有权依法获得赔偿；</p>
      <p class="second-space">7、在合法权益受到损害时向有关部门投诉或者要求出境社协助索赔；</p>
      <p class="second-space">8、《中华人民共和国旅游法》、《中华人民共和国消费者权益保护法》和有关法律、法规赋予旅游者的其他各项权利。</p>
      <p class="first-space">第八条：旅游者的义务</p>
      <p class="second-space">1、如实填写《出境旅游报名表》、签证/签注资料和游客安全信息卡等各项内容，告知与旅游活动相关的个人健康信息，并对其真实性负责，保证所提供的联系方式准确无误且能及时联系；</p>
      <p class="second-space">2、向出境社提交能有效使用的因私护照或者通行证，自办签证/签注者应当确保所持签证/签注在出游期间有效；</p>
      <p class="second-space">3、按照合同约定支付旅游费用；</p>
      <p class="second-space">4、按照合同约定随团完成旅游行程，配合领队人员的统一管理；</p>
      <p class="second-space">5、遵守我国和旅游目的地国家（地区）的法律、法规和有关规定，不携带违禁物品出入境；不参与色情、赌博和涉毒活动；不擅自脱团；不在境外滞留不归；</p>
      <p class="second-space">
        6、遵守旅游目的地国家（地区）的公共秩序和社会公德，尊重当地的风俗习惯，文化传统和宗教信仰，爱护旅游资源，保护生态环境，遵守《中国公民出国（境）旅游文明行为指南》等文明行为规范；</p>
      <p class="second-space">7、对国家应对重大突发事件暂时限制旅游活动的措施以及有关部门、机构或者旅游经营者采取的安全防范和应急处置措施予以配合；</p>
      <p class="second-space">8、妥善保管自己的行李物品，随身携带现金、有价证券、贵重物品，不在行李中夹带。</p>
      <p class="second-space">
        9、在旅游活动中或者在解决纠纷时，应采取适当措施防止损失扩大，不损害当地居民的合法权益，不干扰他人的旅游活动，不损害旅游经营者和旅游从业人员的合法权益，不采取拒绝上、下机（车、船）、拖延行程或者脱团等不当行为。</p>
      <p class="second-space">10、在自行安排活动期间，应当在自己能够控制风险的范围内选择活动项目，遵守旅游活动中的安全警示规定，对自己的安全负责。</p>
      <p class="first-space badge">第四章：合同的变更与转让</p>
      <p class="first-space">第九条：合同的变更</p>
      <p class="second-space">
        1、出境社与旅游者双方协商一致，可以变更本合同约定的内容，但应当以书面形式由双方签字确认。由此增加的旅游费用及给对方造成的损失，由变更提出方承担；由此减少的旅游费用，出境社应当退还旅游者。</p>
      <p class="second-space">
        2、行程开始前遇到不可抗力或者出境社、履行辅助人已尽合理注意义务仍不能避免的事件的，双方经协商可以取消行程或者延期出行。取消行程的，按照本合同第十四条处理；延期出行的，增加的费用由旅游者承担，减少的费用退还旅游者。</p>
      <p class="second-space">3、行程中遇到不可抗力或者出境社、履行辅助人已尽合理注意义务仍不能避免的事件，影响旅游行程的，按以下方式处理：</p>
      <p class="three-space">（1）合同不能完全履行的，旅行社经向旅游者作出说明，旅游者同意变更的，可以在合理范围内变更合同，因此增加的费用由旅游者承担，减少的费用退还旅游者。</p>
      <p class="three-space">（2）危及旅游者人身、财产安全的，旅行社应当采取相应的安全措施，因此支出的费用，由出境社与旅游者分担。</p>
      <p class="three-space">（3）造成旅游者滞留的，旅行社应采取相应的安置措施。因此增加的食宿费用由旅游者承担，增加的返程费用双方分担。</p>
      <p class="first-space">第十条：合同的转让</p>
      <p class="second-space">旅游行程开始前，旅游者可以将本合同中自身的权利义务转让给第三人，出境社没有正当理由的不得拒绝，并办理相关转让手续，因此增加的费用由旅游者和第三人承担。</p>
      <p class="second-space">正当理由包括但不限于：对应原报名者办理的相关服务不可转让给第三人的；无法为第三人办妥签证/签注、安排交通等情形的；旅游活动对于旅游者的身份、资格等有特殊要求的。</p>
      <p class="first-space">第十一条：不成团的安排</p>
      <p class="second-space">当未达到约定的成团人数不能成团时，旅游者可以与出境社就如下安排在本合同第二十三条中做出约定。</p>
      <p class="second-space">
        1、转团：出境社可以在保证所承诺的服务内容和标准不降低的前提下，经事先征得旅游者书面同意，委托其他旅行社履行合同，并就受委托出团的出境社违反本合同约定的行为先行承担责任，再行追偿。旅游者和受委托出团的出境社另行签订合同的，本合同的权利义务终止。</p>
      <p class="second-space">
        2、延期出团或者改签线路出团：出境社经征得旅游者书面同意，可以延期出团或者改签其他线路出团，因此增加的费用由旅游者承担，减少的费用出境社予以退还。需要时可以重新签订旅游合同。</p>
      <p class="first-space badge">第五章：合同的解除</p>
      <p class="first-space">第十二条：出境社解除合同</p>
      <p class="second-space">
        1、未达到约定的成团人数不能成团时，出境社解除合同的，应当采取书面等有效形式。出境社在行程开始前30日（按照出发日减去解除合同通知到达日的自然日之差计算，下同）以上（含第30日，下同）提出解除合同的，不承担违约责任，出境社向旅游者退还已收取的全部旅游费用（不得扣除签证/签注费用）；出境社在行程开始前30日以内（不含第30日，下同）提出解除合同的，除向旅游者退还已收取的全部旅游费用外，还应当按照本合同第十七条第1款的约定承担相应的违约责任。</p>
      <p class="second-space">2、旅游者有下列情形之一的，出境社可以解除合同（相关法律、行政法规另有规定的除外）：</p>
      <p class="three-space">（1）患有传染病等疾病，可能危害其他旅游者健康和安全的；</p>
      <p class="three-space">（2）携带危害公共安全的物品且不同意交有关部门处理的；</p>
      <p class="three-space">（3）从事违法或者违反社会公德的活动的；</p>
      <p class="three-space">（4）从事严重影响其他旅游者权益的活动，且不听劝阻、不能制止的；</p>
      <p class="three-space">（5）法律规定的影响合同履行的其他情形。</p>
      <p class="second-space">出境社因上述情形解除合同的，应当以书面等形式通知旅游者，按照本合同第十五条的相关约定扣除必要的费用后，将余款退还旅游者。</p>
      <p class="first-space">第十三条：旅游者解除合同</p>
      <p class="second-space">
        1、未达到约定的成团人数不能成团时，旅游者既不同意转团，也不同意延期出行或者改签其他线路出团的，出境社应及时发出不能成团的书面通知，旅游者可以解除合同。旅游者在行程开始前30日以上收到旅行社不能成团通知的，旅行社不承担违约责任，向旅游者退还已收取的全部旅游费用；旅游者在行程开始前30日以内收到旅行社不能成团通知的，按照本合同第十七条第1款相关约定处理。</p>
      <p class="second-space">
        2、除本条第1款约定外，在行程结束前，旅游者亦可以书面等形式解除合同（相关法律、行政法规另有规定的除外）。旅游者在行程开始前30日以上提出解除合同的，未办理签证/签注的，出境社应当向旅游者退还全部旅游费用；已办理签证/签注的，应当扣除签证/签注费用（旅游者自办的除外）；旅游者在行程开始前30日以内提出解除合同的，出境社按照本合同第十五条相关约定扣除必要的费用后，将余款退还旅游者。</p>
      <p class="second-space">3、旅游者未按约定时间到达约定集合出发地点，也未能在出发中途加入旅游团队的，视为旅游者解除合同，按照本合同第十五条相关约定处理。</p>
      <p class="first-space">第十四条：因不可抗力或者已尽合理注意义务仍不能避免的事件解除合同</p>
      <p class="second-space">
        因不可抗力或者出境社、履行辅助人已尽合理注意义务仍不能避免的事件，影响旅游行程，合同不能继续履行的，出境社和旅游者均可以解除合同；合同不能完全履行，旅游者不同意变更的，可以解除合同（因已尽合理注意义务仍不能避免的事件提出解除合同的，相关法律、行政法规另有规定的除外）。</p>
      <p class="second-space">合同解除的，出境社应当在扣除已向地接社或者履行辅助人支付且不可退还的费用后，将余款退还旅游者。</p>
      <p class="first-space">第十五条：必要的费用扣除</p>
      <p class="second-space">1、旅游者在行程开始前30日以内提出解除合同或者按照本合同第十二条第2款约定由出境社在行程开始前解除合同的，按下列标准扣除必要的费用：</p>
      <p class="three-space">行程开始前29日至15日，按旅游费用总额的5%；</p>
      <p class="three-space">行程开始前14日至7日，按旅游费用总额的20%；</p>
      <p class="three-space">行程开始前6日至4日，按旅游费用总额的50%；</p>
      <p class="three-space">行程开始前3日至1日，按旅游费用总额的60%；</p>
      <p class="three-space">行程开始当日，按旅游费用总额的70%。</p>
      <p class="second-space">2、在行程中解除合同的，必要的费用扣除标准为：</p>
      <p class="three-space">旅游费用×行程开始当日扣除比例+（旅游费用-旅游费用×行程开始当日扣除比例)÷旅游天数×已经出游的天数。</p>
      <p class="second-space">如按上述第1款或者第2款约定比例扣除的必要的费用低于实际发生的费用，旅游者按照实际发生的费用支付，但最高额不应当超过旅游费用总额。</p>
      <p class="second-space">解除合同的，出境社扣除必要的费用后，应当在解除合同通知到达日起5个工作日内为旅游者办结退款手续。</p>
      <p class="first-space">第十六条：出境社协助旅游者返程及费用承担</p>
      <p class="second-space">
        旅游行程中解除合同的，出境社应协助旅游者返回出发地或者旅游者指定的合理地点。因旅行社或者履行辅助人的原因导致合同解除的，返程费用由出境社承担；行程中按照本合同第十二条第2款，第十三条第2款约定解除合同的，返程费用由旅游者承担；按照本合同第十四条约定解除合同的，返程费用由双方分担。</p>
      <p class="first-space badge">第六章：违约责任</p>
      <p class="first-space">第十七条：出境社的违约责任</p>
      <p class="second-space">
        1、出境社在行程开始前30日以内提出解除合同的，或者旅游者在行程开始前30日以内收到出境社不能成团通知，不同意转团、延期出行和改签线路解除合同的，出境社向旅游者退还已收取的全部旅游费用（不得扣除签证／签注等费用），并按下列标准向旅游者支付违约金：</p>
      <p class="three-space">行程开始前29日至15日，支付旅游费用总额2%的违约金；</p>
      <p class="three-space">行程开始前14日至7日，支付旅游费用总额5%的违约金；</p>
      <p class="three-space">行程开始前6日至4日，支付旅游费用总额10%的违约金；</p>
      <p class="three-space">行程开始前3日至1日，支付旅游费用总额15%的违约金；</p>
      <p class="three-space">行程开始当日，支付旅游费用总额20%的违约金。</p>
      <p class="second-space">如按上述比例支付的违约金不足以赔偿旅游者的实际损失，出境社应当按实际损失对旅游者予以赔偿。</p>
      <p class="second-space">出境社应当在取消出团通知或者旅游者不同意不成团安排的解除合同通知到达日起5个工作日内，为旅游者办结退还全部旅游费用的手续并支付上述违约金。</p>
      <p class="second-space">
        2、出境社未按合同约定提供服务，或者未经旅游者同意调整旅游行程（本合同第九条第3款规定的情形除外），造成项目减少、旅游时间缩短或者标准降低的，应当依法承担继续履行、采取补救措施或者赔偿损失等违约责任。</p>
      <p class="second-space">
        3、出境社具备履行条件，经旅游者要求仍拒绝履行本合同义务的，出境社向旅游者支付旅游费用总额30%的违约金，旅游者采取订同等级别的住宿、用餐、交通等补救措施的，费用由出境社承担；造成旅游者人身损害、滞留等严重后果的，旅游者还可以要求出境社支付旅游费用一倍以上三倍以下的赔偿金。</p>
      <p class="second-space">
        4、未经旅游者同意，出境社转团、拼团的，出境社应向旅游者支付旅游费用总额25%的违约金；旅游者解除合同的，出境社还应向未随团出行的旅游者退还全部旅游费用，向已随团出行的旅游者退还尚未发生的旅游费用。如违约金不足以赔偿旅游者的实际损失，出境社应当按实际损失对旅游者予以赔偿。</p>
      <p class="second-space">5、出境社有以下情形之一的，旅游者有权在旅游行程结束后30日内，要求出境社为其办理退货并先行垫付退货货款，或者退还另行付费旅游项目的费用：</p>
      <p class="three-space">（1）出境社以不合理的低价组织旅游活动，诱骗旅游者，并通过安排购物或者另行付费旅游项目获取回扣等不正当利益的；</p>
      <p class="three-space">（2）未经双方协商一致或者未经旅游者要求，出境社指定具体购物场所或者安排另行付费旅游项目的。</p>
      <p class="second-space">6、与旅游者出现纠纷时，出境社应当积极采取措施防止损失扩大，否则应当就扩大的损失承担责任。</p>
      <p class="first-space">第十八条：旅游者的违约责任</p>
      <p class="second-space">1、因不听从出境社及其领队的劝告、提示而影响团队行程，给出境社造成损失的，应当承担相应的赔偿责任。</p>
      <p class="second-space">2、旅游者超出本合同约定的内容进行个人活动所造成的损失，由其自行承担。</p>
      <p class="second-space">3、由于旅游者的过错，使出境社、履行辅助人、旅游从业人员或者其他旅游者遭受损害的，应当由旅游者赔偿损失。</p>
      <p class="second-space">4、旅游者在旅游活动中或者在解决纠纷时，应采取措施防止损失扩大，否则应当就扩大的损失承担相应的责任。</p>
      <p class="second-space">5、旅游者违反安全警示规定，或者对国家应对重大突发事件暂时限制旅游活动的措施、安全防范和应急处置措施不予配合，造成旅行社损失的，应当依法承担相应责任。</p>
      <p class="first-space">第十九条：其他责任</p>
      <p class="second-space">
        1、因旅游者提供材料存在问题或者自身其他原因被拒签、缓签、拒绝入境和出境的，相关责任和费用由旅游者承担，出境社将未发生的费用退还旅游者。如给出境社造成损失的，旅游者还应当承担赔偿责任。因出境社原因导致旅游者被拒签而解除合同的，依据本合同第十七条第1款处理。</p>
      <p class="second-space">2、由于旅游者自身原因导致本合同不能履行或者不能按照约定履行，或者造成旅游者人身损害、财产损失的，出境社不承担责任。</p>
      <p class="second-space">3、旅游者自行安排活动期间人身、财产权益受到损害的，出境社在事前已尽到必要警示说明义务且事后已尽到必要救助义务的，出境社不承担赔偿责任。</p>
      <p class="second-space">
        4、由于第三方侵害等不可归责于出境社的原因导致旅游者人身、财产权益受到损害的，出境社不承担赔偿责任。但因出境社不履行协助义务致使旅游者人身、财产权益损失扩大的，应当就扩大的损失承担赔偿责任。</p>
      <p class="second-space">5、由于公共交通经营者的原因造成旅游者人身损害、财产损失依法应承担责任的，出境社应当协助旅游者向公共交通经营者索赔。</p>
      <p class="first-space badge">第七章：协议条款</p>
      <p class="first-space">第二十条：线路行程时间</p>
      <p class="second-space">
        <span class="qm-line time">{{allInfo.StartYear}}</span>年<span class="qm-line time">{{allInfo.StartMonth}}</span>月<span
        class="qm-line time">{{allInfo.StartMonth}}</span>日<span class="qm-line time">/</span>时，结束时间<span
        class="qm-line time">{{allInfo.EndYear}}</span>年<span class="qm-line time">{{allInfo.EndMonth}}</span>月<span
        class="qm-line time">{{allInfo.EndDay}}</span>日<span class="qm-line time">/</span>时；共&nbsp;<span
        class="qm-line time">{{allInfo.DayNum}}</span>天<span class="qm-line time">{{allInfo.NightNum}}</span>夜。
      </p>
      <p class="first-space">第二十一条：旅游费用及支付（以人民币为计算单位）</p>
      <p class="second-space" v-for="(item, index) in allInfo.PriceType" :key="index">{{item.Name}} : <span
        class="qm-line time">{{item.Price}}</span>元 ，<span class="qm-line time">{{item.Num}}</span>人 </p>
      <p class="second-space"> 其中，导游服务费：&nbsp;&nbsp;&nbsp;<span class="qm-line time">0</span>元/人</p>
      <p class="second-space" v-if="allInfo.OrderRemark">备注说明：<span class="qm-line time">{{allInfo.OrderRemark}}</span>
      </p>
      <p class="second-space">旅游费用合计：<span class="qm-line time">{{allInfo.Amount}}元</span>。</p>
      <p class="second-space">旅游费用支付方式：<span class="qm-line time">现金或转账</span>。</p>
      <p class="first-space">第二十二条：人身意外伤害保险</p>
      <p class="second-space">1、出境社提示旅游者购买人身意外伤害保险；</p>
      <p class="second-space">2、旅游者可以做以下选择：</p>
      <p class="three-space">□&nbsp;委托出境社购买（出境社不具有保险兼业代理资格的，不得勾选此项）：保险产品名称<span class="qm-line time">{{allInfo.BaoXianName}}</span>（投保的相关信息以实际保单为准）；
      </p>
      <p class="three-space">□&nbsp;自行购买；</p>
      <p class="three-space">□&nbsp;放弃购买。</p>
      <p class="first-space">第二十三条：成团人数与不成团的约定</p>
      <p class="second-space">成团的最低人数：<span class="qm-line time">{{allInfo.KeHu_Num}}</span>人。</p>
      <p class="second-space">如不能成团，旅游者是否同意按下列方式解决：</p>
      <p class="second-space">1、<span class="qm-line tyqm time">同意</span>(同意或者不同意，打勾无效）出境社委托<span class="qm-line time">{{allInfo.htedit.IsShowMy == 0 ? allInfo.QiTaGongYingShang : allInfo.LvXingShe_Name}}</span>出境社履行合同；
      </p>
      <p class="second-space">2、<span class="qm-line tyqm time">{{allInfo.htedit.Delay == 0 ? '不同意' : '同意'}}</span>(同意或者不同意，打勾无效）延期出团；
      </p>
      <p class="second-space">3、<span class="qm-line tyqm time">{{allInfo.htedit.ChangeLine == 0 ? '不同意' : '同意'}}</span>(同意或者不同意，打勾无效）改签其他线路出团；
      </p>
      <p class="second-space">4、<span class="qm-line tyqm time">{{allInfo.htedit.Relieve == 0 ? '不同意' : '同意'}}</span>(同意或者不同意，打勾无效）解除合同。
      </p>
      <p class="first-space">第二十四条：拼团约定</p>
      <p class="second-space">旅游者<span class="qm-line tyqm time">{{allInfo.htedit.PinTuan == 1 ? '同意' : '不同意'}}</span>（同意或者不同意，打勾无效）采用拼团方式拼至<span
        class="qm-line time">{{allInfo.htedit.IsShowMy == 0 ? allInfo.QiTaGongYingShang : allInfo.LvXingShe_Name}}</span>出境社成团。
      </p>
      <p class="first-space">第二十五条：自愿购物和参加另行付费旅游项目约定</p>
      <p class="second-space">1、旅游者可以自主决定是否参加出境社安排的购物活动、另行付费旅游项目；</p>
      <p class="second-space">
        2、出境社可以在不以不合理的低价组织旅游活动、不诱骗旅游者、不获取回扣等不正当利益，且不影响其他旅游者行程安排的前提下，按照平等自愿、诚实信用的原则，与旅游者协商一致达成购物活动、另行付费旅游项目协议；</p>
      <p class="second-space">3、购物活动、另行付费旅游项目安排应不与《行程单》冲突；</p>
      <p class="second-space">4、地接社及其从业人员在行程中安排购物活动、另行付费旅游项目的，责任由订立本合同的出境社承担；</p>
      <p class="second-space">5、购物活动、另行付费旅游项目具体约定见《自愿购物活动补充协议》（附件3）、《自愿参加另行付费旅游项目补充协议》（附件4）。</p>
      <p class="first-space">第二十六条：争议的解决方式</p>
      <p class="second-space">本合同履行过程中发生争议，由双方协商解决，亦可向合同签订地的旅游质监执法机构、消费者协会、有关的调解组织等有关部门或者机构申请调解。协商或者调解不成的，按下列第<span
        class="qm-line time">2</span>种方式解决：</p>
      <p class="second-space">1、提交<span class="qm-line time">/</span>仲裁委员会仲裁；</p>
      <p class="second-space">2、依法向人民法院起诉。</p>
      <p class="first-space">第二十七条：其他约定事项</p>
      <p class="second-space">未尽事宜，经旅游者和出境社双方协商一致，可以列入补充条款。（如合同空间不够，可以另附纸张，由双方签字或者盖章确认。）</p>
      <p class="first-space">第二十八条：合同效力</p>
      <p class="second-space">本合同一式<span class="qm-line time">2</span>份，双方各持<span class="qm-line time">1</span>份，具有同等法律效力，自双方当事人签字或者盖章之日起生效。
      </p>
      <div class="itembox">
        <p>旅游者代表签字（盖章）：<img class="lvyouzhe" :src="allInfo.KeHu_QianMing"></p>
        <p>联系电话：<span class="qm-line time">{{allInfo.KeHu_Telephone}}</span></p>
      </div>
      <div class="itembox">
        <p>旅行社盖章：<img class="lvxingshe" :src="allInfo.LvXingShe_GongZhang"></p>
        <p>签约代表签字（盖章）：<img class="daibiaoqz" :src="allInfo.LvXingShe_QianZi"></p>
        <p>营业地址：<span class="qm-line time">{{allInfo.LvXingShe_Address}}</span></p>
        <p>联系电话：<span class="qm-line time">{{allInfo.LvXingShe_Tel}}</span></p>
        <p>邮编：<span class="qm-line time">{{allInfo.LvXingShe_YouBian}}</span></p>
        <p>电子信箱：<span class="qm-line time">{{allInfo.LvXingShe_Email}}</span></p>
        <p>签约日期：<span class="qm-line time">{{allInfo.LvXingShe_QianYueDate}}</span></p>
        <p>签约地点：<span class="qm-line time">网上</span></p>
      </div>
      <div class="itembox">
        <p>出境社监督、投诉电话：<span class="qm-line time">{{allInfo.LvXingShe_TouSuTel}}</span></p>
        <p>政府监督执法机构：<span class="qm-line time">{{allInfo.LvXingShe_ShengFen}}</span>省<span class="qm-line time">{{allInfo.LvXingShe_ChengShi}}</span>市旅游质监执法机构：<span
          class="qm-line time">{{allInfo.ZhengFu_TouSuJiGou}}</span> 投诉电话：<span class="qm-line time">{{allInfo.ZhengFu_TouSuTel}}</span>
        </p>
      </div>
      <div v-if="!allInfo.upload.Has" :class="['qifeng', ('qifeng' + (index+1))]"
            v-for="(item, index) in allInfo.QiFengZhang" :key="index">
        <img :src="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import serverHttp from '@/assets/common/tour.js'

export default {
  data () {
    return {
      allInfo: {
        upload: {
          Has: ''
        },
        htedit: {
          IsShowMy: ''
        }
      },
      OrderId: ''
    }
  },
  created () {
    this.OrderId = this.$route.query.OrderId || ''
    this.getListData()
  },
  methods: {
    getListData () {
      serverHttp.getContractPerson({
        OrderId: this.OrderId,
        FjType: 0
      }).then(res => {
        if (res.code === 0) {
          this.allInfo = res.data
          this.$nextTick(() => {
            var Dan = 650
            for (var i = 1; i <= 7; i++) {
              if (i === 1) {
                document.querySelector('.qifeng' + i).style.top = Dan * i + 'px'
              } else {
                var num = i - 1
                document.querySelector('.qifeng' + i).style.top = (Dan * num) + (Dan * i) + (70 * i) + (70 * num) + 'px'
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .qifeng {
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    height: 150px;
    overflow: hidden;
  }

  body {
    font-family: "宋体", sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: "宋体", sans-serif;
  }

  em {
    font-style: normal;
  }

  .first-space {
    text-indent: 0;
  }

  .first-space.badge {
    margin: 45px 0 10px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
  }

  .second-space {
    text-indent: 20px;
  }

  .three-space {
    text-indent: 30px;
  }

  .ht {
    position: relative;
    margin: 0 auto;
    width: 1000px;
    padding-bottom: 50px;
    text-align: left;
    font-size: 16px;
    line-height: 30px;
  }

  .ht .mtb15 {
    margin: 15px 0;
  }

  .ht .title {
    margin: 80px 0 20px;
    text-align: center;
    font-size: 22px;
  }

  .ht .title.first-title {
    font-size: 29px;
  }

  .ht .qm-line {
    padding: 0 70px;
    border-bottom: 1px solid #333;
  }

  .ht .qm-line.time {
    padding: 0 10px;
    color: #e04545;
    font-weight: bold;
  }

  .ht p, .tyqm {
    position: relative;
  }

  .tyqm img {
    position: absolute;
    top: -1px;
    left: -2px;
    height: 19px;
  }

  .lvyouzhe, .daibiaoqz {
    height: 60px;
    vertical-align: middle;
  }

  .lvxingshe {
    width: 130px;
  }

  .article-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 5px 10px;
    background: #fff;
    z-index: 9999;
  }

  .article-btn a {
    float: left;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #ff6815;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
  }

  @media screen and (max-width: 450px) {
    .ht {
      padding: 0 5px;
      width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }

    .ht .qm-line {
      padding: 0 40px;
    }

    .second-space {
      text-indent: 0;
    }
  }
</style>
