class Api::ProtoGeneratorController < ApplicationController
    def generate_proto
        filename = params[:fileName]
        package_header = params[:packageName]
        service = params[:service]
        messages = params[:messages]

        proto_content = generate_proto_content(package_header, service, messages)

        # Create a new file and save it using the CarrierWave uploader
        file = File.new("tmp/#{filename}.proto", "w")
        file.write(proto_content)
        file.close

        # Upload the file to the server
        uploader = ProtoFileUploader.new
        uploader.store!(File.open("tmp/#{filename}.proto"))

        # Return the url of the uploaded file
        render json: { url: uploader.url }
        
    end

    private

    def generate_proto_content(package_header, service, messages)
    proto_content = ""
    proto_content += "syntax = \"proto3\";\n\n"
    proto_content += "package #{package_header}\n\n"
    proto_content += "service #{service[:serviceName]} {\n"
    proto_content += "    rpc #{service[:rpcName]} (#{service[:requestType]}) returns (#{service[:responseType]});\n"
    proto_content += "}\n\n"
    messages.each do |message|
        i = 1
        proto_content += "message #{message[:name]} {\n"
        message[:params].each do |param|
            proto_content += "    #{param[:paramType]} #{param[:paramName]} = #{i};\n"
            i += 1
        end
        proto_content += "}\n\n"
        i = 0
    end

    return proto_content
    end
end
