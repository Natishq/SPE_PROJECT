const HrVendor = require('../models/hrVendor');


/*

vendor -> { HR :  , vendor:   , sendby :    }

HR <- which rquest ==> table --HRVENDOR-- block -> userid == HRiD && sender == VENDOR   

*/

// connection request to Hr by vEndor
exports.sendByVendor =(req,res)=>{
    const data = {
        sendBY:req.profile.role,
        hr:req.body.hr,
        vendor:req.params.userId
    }
    try
    {
    HrVendor.create(data,(err,data)=>{
        if(err){
            return res.status(400).json({
                err:"not able to send request"
            })
        }
        res.json({
            message:"request sent successfully",
            data
        })
    })
    }
    catch(err)
    {
        res.status(400).json({
            error:err
        });
    }

}

exports.acceptRelationHr = (req,res)=>{
    HrVendor.findOneAndUpdate({ hr:req.params.userId , vendor:req.body.vendor},{status:true},(err,data)=>{
        if(err)
        {
            res.json({
                message:err
            })
        }
        else
        {
            res.json(data);
        }
    })
}

const vendorWorker = require('../models/vendorWorker');

exports.acceptRelationVendor = (req,res)=>{
    vendorWorker.findOneAndUpdate({ Vendor:req.params.userId , worker:req.body.worker},{status:true},(err,data)=>{
        if(err)
        {
            res.json({
                message:err
            })
        }
        else
        {
            res.json(data);
        }
    })
}

// worker to raise issues
exports.raiseissue = (req,res)=>{
    vendorWorker.findOneAndUpdate({ worker:req.params.userId , Vendor:req.body.vendor , HR:req.body.hr},{issue:true},(err,data)=>{
        if(err)
        {
            res.json({
                message:err
            })
        }
        else
        {
            res.json({
                message:"sucess",
                data}
                );
        }
    })
}

// Hr to check issues of workers
exports.getresult =(req,res)=>{
    var total=0;
    /* 
    obj ={ vendor }
    
    */
    vendorWorker.find({HR:req.params.userId},(err,data)=>{
        if(err)
        {
            res.status(400).json({
                message:err
            })
        }
        else{
            
            // logic vendor -, workers ->{Hr , Vendor}
            // worker vendor Hr 
            // -> worker , venodr
            // { vendor -> total , issue }

            let issueMap = new Map();
            let totalMap = new Map(); // key vendor , count 

            function passit(obj)
            {
                console.log(obj);

                if(totalMap[obj.Vendor]!=undefined)
                {
                    totalMap[obj.Vendor]++;
                }
                else
                {
                   console.log("here");
                    totalMap[obj.Vendor]=1;
                }

                if(issueMap[obj.Vendor]!=undefined)
                {
                    if(obj.issue)
                    {
                        issueMap[obj.Vendor]++;
                    }
                }
                else
                {
                    console.log("here2");
                   issueMap[obj.Vendor]=0;
                   if(obj.issue)
                    {
                        issueMap[obj.Vendor]++;
                    }
                }
            }
            data.forEach(passit);
           

            for(m in issueMap)
            {
                issueMap[m] = issueMap[m]/totalMap[m];  
            }
            
            ans = {}

            for(m in issueMap)
            {
                if(issueMap[m]>0.3)
                {
                    ans[m]=true;
                }
            }
            



            

            res.json(ans);
        }
    })

    
}

exports.sendByWorker = (req,res)=>{
    const data = {
        sendBY:req.profile.role,
        worker:req.params.userId,
        Vendor:req.body.vendor,
        HR:req.body.hr
    }
    try
    {
    vendorWorker.create(data,(err,data)=>{
        if(err){
            return res.status(400).json({
                error:"not able to send request",
                message:err
            })
        }
        res.json({
            message:"request sent successfully",
            data
        })
    })
    }
    catch(err)
    {
        res.status(400).json({
            error:err
        });
    }


}