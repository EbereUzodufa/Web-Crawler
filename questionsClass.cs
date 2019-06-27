//Adding Newtonsoft Json Nuget
using Newtonsoft.Json

public class Questions
{
    public int id {get; set;};
    public string question {get; set;};
    public string option {get; set;};
    public string section {get; set;};
    public string image {get; set;};
    public string answer {get; set;};
    public string solution {get; set;};
    public DateTime examType {get; set;};
    public DateTime examYear {get; set;};
    public string subject {get; set;};
}

private string jsonFile = "questions-export.json";

private List<Questions> QuestionsList = new List<Questions>();

//This collects the JSON file and reads it.
public void LoadJson()
{
    try
    {
        if(jsonFile){
            using (StreamReader r = new StreamReader(jsonFile))
            {
                string json = r.ReadToEnd();
                //Assign questions as list
                QuestionsList = JsonConvert.DeserializeObject<List<Questions>>(json);
            }
        } else{
            //Message no file ohP
            
        }
    }
    catch (System.Exception)
    {
        throw;
    }
    
}

//Loop throw each question
private void tapEachQuestion()
{
    foreach(var question in QuestionsList)
    {
        //Write out each question
        Console.WriteLine(question);
    }
}