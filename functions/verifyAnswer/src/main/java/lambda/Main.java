package lambda;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class Main implements RequestHandler<Main.Request, Boolean> {

    private AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
    private DynamoDBMapper mapper = new DynamoDBMapper(client);

    @Override
    public Boolean handleRequest(Request request, Context context) {
        context.getLogger().log("My input is: " + request);

        Problem problem = mapper.load(Problem.class, request.getProblemId());
        String expression = problem.getCode().replaceAll("__", request.getAnswer()) + "; problem();";
        try {
            return eval(expression);
        } catch (ScriptException e) {
            return false;
        }
    }

    private Boolean eval(String expression) throws ScriptException {
        ScriptEngine engine = new ScriptEngineManager().getEngineByName("javascript");
        return (Boolean) engine.eval(expression);
    }

    public static class Request {
        private Long problemId;
        private String answer;

        public Long getProblemId() {
            return problemId;
        }

        public void setProblemId(Long problemId) {
            this.problemId = problemId;
        }

        public String getAnswer() {
            return answer;
        }

        public void setAnswer(String answer) {
            this.answer = answer;
        }

        @Override
        public String toString() {
            return "Request [problemId=" + problemId + ", answer=" + answer + "]";
        }
    }
}
